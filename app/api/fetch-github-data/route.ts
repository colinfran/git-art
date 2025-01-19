import { fetchCommitsForUser } from "@/lib/git/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  const commits = await fetchCommitsForUser(data)
  // await insertAllUserCommits(username, commits)
  return NextResponse.json({ commits })
}
