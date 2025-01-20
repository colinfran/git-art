import React, { FC } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import Providers from "./providers"
import { auth } from "@/lib/auth/index"
import { Logo } from "@/components/logo"
import HeaderDropdown from "../components/header-dropdown"

export const metadata = {
  title: "Git Song | Git Commits -> Music",
  description:
    "Discover and visualize your GitHub contributions in a musical way. Git Song transforms your GitHub activity into a unique auditory experience.",
}

type Props = any // eslint-disable-line @typescript-eslint/no-explicit-any

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth()
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers session={session}>
          <main className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:px-7 sm:py-4">
              <header className="sticky top-0 z-30 flex h-[50px] items-center gap-4 border-b bg-background px-4 y-2 sm:static sm:border-0 sm:bg-transparent sm:px-6">
                <Logo />
                {session?.user && <HeaderDropdown />}
              </header>
              <main className="grid flex-1 items-start gap-2 md:gap-4">{children}</main>
            </div>
          </main>
        </Providers>
      </body>
      <Analytics />
    </html>
  )
}

export default RootLayout
