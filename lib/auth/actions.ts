"use server"
import { signOut, signIn } from "@/lib/auth/index"

export const authenticate = async (): Promise<void> => {
  return await signIn("github", { redirectTo: "/app" })
}

export const logout = async (): Promise<void> => {
  return await signOut({ redirectTo: "/", redirect: true })
}
