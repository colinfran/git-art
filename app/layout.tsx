import React, { FC } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import Providers from "./providers"
import { auth } from "@/lib/auth/index"
import { Logo } from "@/components/logo"
import HeaderDropdown from "../components/header-dropdown"

export const metadata = {
  title: "GitArt | Turn your git commits into art!",
  description:
    "Discover and visualize your GitHub contributions in an artistic way. GitArt transforms your GitHub activity into a unique visual experience.",
}

type Props = any // eslint-disable-line @typescript-eslint/no-explicit-any

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth()
  return (
    <html lang="en">
      <head>
        <link href="/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
        <link href="/apple-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
        <link href="/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
        <link href="/apple-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
        <link href="/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
        <link href="/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
        <link href="/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
        <link href="/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/android-icon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/manifest.json" rel="manifest" />
        <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />

        <title>GitArt - Visualize Your GitHub Contributions</title>

        {/* <!-- SEO Meta Tags --> */}
        <meta
          content="Explore your GitHub contributions through an artistic lens. GitArt transforms your GitHub activity into a unique visual journey."
          name="description"
        />
        <meta
          content="GitArt, GitHub contributions, visual GitHub activity, GitArt experience, visual art of GitHub, Git visualization, GitHub stats, artistic GitHub, explore Git contributions, GitHub journey"
          name="keywords"
        />
        <meta content="GitArt" name="author" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="https://yourgitartlink.com" rel="canonical" />

        {/* <!-- Open Graph Meta Tags --> */}
        <meta content="website" property="og:type" />
        <meta content="GitArt - Visualize Your GitHub Contributions" property="og:title" />
        <meta
          content="Discover your GitHub contributions through unique visual representations with GitArt."
          property="og:description"
        />
        <meta content="https://gitart.app" property="og:url" />
        <meta content="/ogimage-gitart.jpg" property="og:image" />

        {/* <!-- Twitter Card Meta Tags --> */}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="GitArt - Visualize Your GitHub Contributions" name="twitter:title" />
        <meta
          content="Explore your GitHub contributions in a creative and artistic way with GitArt."
          name="twitter:description"
        />
        <meta content="https://gitart.app" name="twitter:image" />
        <meta content="Visual representation of GitHub activity" property="twitter:image:alt" />
      </head>
      <body className="flex min-h-screen w-full flex-col">
        <Providers session={session}>
          <main className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:px-7 sm:py-4">
              <header className="sticky top-0 z-30 flex h-[50px] items-center gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
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
