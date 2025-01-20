import { addImage, hasUserCreatedImageToday } from "@/lib/db/images/tasks"
import { fetchCommitsForUser } from "@/lib/git/tasks"
import { createImage, createPrompt } from "@/lib/openai/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  // check if user has generated today
  if (await hasUserCreatedImageToday(data.gitId)) {
    return NextResponse.json({ alreadyGenerated: true })
  }
  // if not generate new image
  const commits = await fetchCommitsForUser(data)
  // create prompt from commits
  const prompt = createPrompt(commits)
  // generate new image
  const image = await createImage(prompt)
  // add image to db
  await addImage(data.gitId, image.data[0].url)
  return NextResponse.json({ image: image })
}
