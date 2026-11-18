import { parseArtOptions } from "@/lib/art-options"
import { getSessionUser, rejectBots, unauthorizedResponse } from "@/lib/auth/session"
import { addImage } from "@/lib/db/images/tasks"
import { addRequest, checkIfRequestExists, removeRequest } from "@/lib/db/requests/tasks"
import { getCreditsCount, updateCreditsCount } from "@/lib/db/users/tasks"
import { fetchCommitsForUser } from "@/lib/git/tasks"
import { uploadImage } from "@/lib/images/task"
import { createImage, createPrompt } from "@/lib/openai/tasks"
import { NextRequest, NextResponse } from "next/server"

/**
 * Generates an image from the signed-in user's commits and spends one of their credits.
 * Only `options` is read from the request; the user always comes from the session.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const botResponse = await rejectBots()
  if (botResponse) return botResponse

  const user = await getSessionUser()
  if (!user) return unauthorizedResponse()

  const { options: rawOptions } = await req.json()
  const options = parseArtOptions(rawOptions)
  if (!options) {
    return NextResponse.json({ error: "Invalid art options" }, { status: 400 })
  }

  if (await checkIfRequestExists(user.gitId)) {
    return NextResponse.json({ requestAlreadyInProgress: true })
  }

  // Check credits before taking the in-progress lock, so running out of credits
  // doesn't leave the user stuck "in progress".
  const creditsCount = await getCreditsCount(user)
  if (creditsCount <= 0) {
    return NextResponse.json({ outOfCredits: true })
  }

  await addRequest(user.gitId)
  try {
    const commits = await fetchCommitsForUser(user)
    const prompt = createPrompt(commits, options)
    const image = await createImage(prompt)
    const url = await uploadImage(image.data[0].url)
    if (url) {
      await addImage(user.gitId, url)
      await updateCreditsCount(user.gitId, -1)
    }
    return NextResponse.json({ image: image })
  } finally {
    // Always release the lock, even if GitHub, OpenAI or the upload fails.
    await removeRequest(user.gitId)
  }
}
