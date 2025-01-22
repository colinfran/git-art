"use client"

import React, { FC, ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = typeof NextThemesProvider & {
  children: ReactNode
}

export const ThemeProvider: FC<Props> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
