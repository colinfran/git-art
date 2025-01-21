import { addImage } from "@/lib/db/images/tasks"
import { getTokenCount, updateTokenCount } from "@/lib/db/users/tasks"
import { fetchCommitsForUser } from "@/lib/git/tasks"
import { uploadImage } from "@/lib/images/task"
import { createImage, createPrompt } from "@/lib/openai/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  // check if user has enough tokens to generate new image
  const tokenCount = await getTokenCount(data)
  if (tokenCount === 0) {
    return NextResponse.json({ outOfTokens: true })
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
    await updateTokenCount(data, tokenCount - 1)
  }
  return NextResponse.json({ image: image })
}
