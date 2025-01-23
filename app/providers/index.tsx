"use client"

import React, { FC, ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider"
import { ImageStatusProvider } from "./image-status-provider"

type Props = {
  children: ReactNode
  session: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Providers: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
        <TooltipProvider>
          <ImageStatusProvider>{children}</ImageStatusProvider>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
