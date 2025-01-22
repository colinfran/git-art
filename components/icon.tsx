"use client"
import React, { FC } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

type Props = {
  size?: number
}

const Icon: FC<Props> = ({ size = 32 }) => {
  const { resolvedTheme: theme } = useTheme()
  const isDark = theme === "dark"
  return (
    <Image
      alt="logo"
      className={isDark ? "invert" : ""}
      height={size}
      src={"/icon.png"}
      width={size}
    />
  )
}

export default Icon
