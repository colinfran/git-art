"use client"

import React, { FC, ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SessionProvider } from "next-auth/react"

type Props = {
  children: ReactNode
  session: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Providers: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  )
}

export default Providers
