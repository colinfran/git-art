import { checkIfRequestExists } from "@/lib/db/requests/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  const inProgress = await checkIfRequestExists(data.gitId)
  if (inProgress) {
    return NextResponse.json({ status: "in progress" })
  }
  return NextResponse.json({ status: "done" })
}
