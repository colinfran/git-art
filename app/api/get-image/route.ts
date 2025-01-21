import { addImage } from "@/lib/db/images/tasks"
import { getCreditsCount, updateCreditsCount } from "@/lib/db/users/tasks"
import { fetchCommitsForUser } from "@/lib/git/tasks"
import { uploadImage } from "@/lib/images/task"
import { createImage, createPrompt } from "@/lib/openai/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  // check if user has enough credits to generate new image
  const creditsCount = await getCreditsCount(data)
  if (creditsCount === 0) {
    return NextResponse.json({ outOfCredits: true })
  }
  // if not generate new image
  const commits = await fetchCommitsForUser(data)
  // create prompt from commits
  const prompt = createPrompt(commits)
  // generate new image
  const image = await createImage(prompt)
  const url = await uploadImage(image.data[0].url)
  // add image to db
  if (url) {
    await addImage(data.gitId, url)
    await updateCreditsCount(data, creditsCount - 1)
  }
  return NextResponse.json({ image: image })
}
