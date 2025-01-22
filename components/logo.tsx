import React, { FC } from "react"
import Link from "next/link"
import { auth } from "@/lib/auth/index"
import IconWrapper from "./icon-wrapper"

export const Logo: FC = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <Link href={user ? "/home" : "/"}>
      <IconWrapper />
    </Link>
  )
}
