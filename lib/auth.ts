import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { createUser, doesUserExist } from "./db/users/tasks"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        console.log(profile)
        // Fetch the GitHub username (login) along with other profile data
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
          gitId: profile.id,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("User", user)
      if (user) {
        const exists = await doesUserExist(user)
        if (exists === "error") {
          return false // Prevent sign-in if error
        }
        if (!exists) {
          const username = (user as { login?: string }).login
          await createUser({
            username: username || "",
            name: user.name || "",
            email: user.email!,
            imageUrl: user.image || null,
          })
        }
      }
      return true // Allow sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user
      }
      return session
    },
  },
})
