import { getSessionUser, unauthorizedResponse } from "@/lib/auth/session"
import { checkIfRequestExists } from "@/lib/db/requests/tasks"
import { NextResponse } from "next/server"

/**
 * Reports whether the signed-in user has an image generation in progress.
 */
export const POST = async (): Promise<NextResponse> => {
  const user = await getSessionUser()
  if (!user) return unauthorizedResponse()

  const inProgress = await checkIfRequestExists(user.gitId)
  if (inProgress) {
    return NextResponse.json({ status: "in progress" })
  }
  return NextResponse.json({ status: "done" })
}
