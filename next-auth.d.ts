// next-auth.d.ts
import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
import { User, Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      login?: string
      gitId?: string
    } & DefaultSession["user"]
  }
}

export { User }
