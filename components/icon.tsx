"use client"
import React, { FC } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

type Props = {
  size?: number
}

const Icon: FC<Props> = ({ size = 32}) => {
  const {resolvedTheme: theme} = useTheme()
  const isDark = theme === "dark"
  return (
     <Image
        alt="logo"
        className={isDark ? "invert" : ""}
        height={32}
        src={"/icon.png"}
        width={32}
      />
  )
}

export default Icon
