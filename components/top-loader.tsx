"use client"
import React, { FC } from "react"
import NextTopLoader from "nextjs-toploader"
import { useTheme } from "next-themes"

export const TopLoader: FC = () => {
  const { resolvedTheme } = useTheme()
  return (
    <NextTopLoader
      color={resolvedTheme === "black" ? "#fff" : "#000"}
      showSpinner={false}
      zIndex={100}
    />
  )
}
