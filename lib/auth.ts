import NextAuth, { User } from "next-auth"
import GitHub from "next-auth/providers/github"
import { createUser, doesUserExist } from "./db/users/tasks"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      async profile(profile) {
        // Fetch the GitHub username (login) along with other profile data
        return {
          id: profile.id.toString(),
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
    async signIn({ user }: { user: User }) {
      if (user) {
        try {
          const exists = await doesUserExist(user)
          if (exists === "error") {
            throw new Error()
          }
          if (!exists) {
            await createUser({
              username: user.login || "",
              name: user.name || "",
              email: user.email!,
              imageUrl: user.image || null,
            })
          }
        } catch (error) {
          return false
        }
        return true
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // async jwt({ token, user }: { token: any; user: User }) {
    //   if (user) {
    //     token.user = user
    //   }
    //   return token
    // },
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // async session({ session, token }: { session: Session; token: any }) {
    //   if (token && token.user) {
    //     session.user = token.user
    //   }
    //   return session
    // },
  },
})
