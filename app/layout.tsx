import React, { FC } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import Providers from "./providers"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Next.js App Router + NextAuth + Tailwind CSS",
  description:
    "A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.",
}

type Props = any // eslint-disable-line @typescript-eslint/no-explicit-any

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth()
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
