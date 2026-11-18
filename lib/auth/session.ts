import { NextResponse } from "next/server"
import { checkBotId } from "botid/server"
import { auth } from "@/lib/auth/index"

export type SessionUser = {
  gitId: string
  login: string
  email: string
  name?: string | null
}

/**
 * Returns the signed-in GitHub user from the session.
 * API routes must use this instead of any gitId, login or email sent in the request,
 * since the request body is fully controlled by the caller.
 * @returns {Promise<SessionUser | null>} The user, or null when nobody is signed in.
 */
export const getSessionUser = async (): Promise<SessionUser | null> => {
  const session = await auth()
  const user = session?.user
  if (!user?.gitId || !user.login) return null
  return {
    gitId: String(user.gitId),
    login: user.login,
    email: user.email || "",
    name: user.name,
  }
}

/**
 * Response for API routes that require a signed-in user.
 * @returns {NextResponse} A 401 JSON response.
 */
export const unauthorizedResponse = (): NextResponse =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 })

/**
 * Runs a Vercel BotID check on the current request. Only call this from routes listed in
 * botIdProtectedRoutes in app/layout.tsx, or every request will be treated as a bot.
 * Fails open: if the check itself errors, the request is allowed so the app keeps working.
 * Always returns null in local development.
 * @returns {Promise<NextResponse | null>} A 403 response if the request came from a bot, otherwise null.
 */
export const rejectBots = async (): Promise<NextResponse | null> => {
  try {
    const { isBot } = await checkBotId()
    if (isBot) return NextResponse.json({ error: "Access denied" }, { status: 403 })
  } catch (error) {
    console.error("BotID check failed, allowing request:", error)
  }
  return null
}
