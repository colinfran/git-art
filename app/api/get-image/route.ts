import { hasUserCreatedImageToday } from "@/lib/db/images/tasks"
import { fetchCommitsForUser } from "@/lib/git/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  // check if user has generated today
  if (await hasUserCreatedImageToday(data.userId)) {
    return NextResponse.json({ result: "already generated today" })
  }
  // if not generate new image
  const commits = await fetchCommitsForUser(data)
  console.log(commits)
  // generate new image
  return NextResponse.json({ url: "image url" })
}
