"use client"

import React, { FC, ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SessionProvider } from "next-auth/react"
import { DataProvider } from "./data-provider"

type Props = {
  children: ReactNode
  session: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Providers: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <DataProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </DataProvider>
    </SessionProvider>
  )
}

export default Providers
