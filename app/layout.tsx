import React, { FC, ReactNode } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import Providers from "./providers"
import { Session } from "next-auth"

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description:
    "A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.",
}

type Props = {
  session: Session | null
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children, session }) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers session={session}>{children}</Providers>
      </body>
      <Analytics />
    </html>
  )
}

export default RootLayout
