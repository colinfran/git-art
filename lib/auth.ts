import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { createUser, doesUserExist } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        const exists = await doesUserExist(user)
        if (exists === "error") {
          return false // Prevent sign-in if error
        }
        if (!exists) {
          await createUser({
            githubId: user.id!,
            username: user.name || "",
            email: user.email!,
            imageUrl: user.image || null,
          })
        }
      }
      return true // Allow sign-in
    },
  },
})
