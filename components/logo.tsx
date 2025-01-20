import React, { FC } from "react"
import Link from "next/link"
import { Logo as Icon } from "@/components/icons"
import { auth } from "@/lib/auth/index"

export const Logo: FC = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <Link href={user ? "/app" : "/"}>
      <Icon size="40px"/>
    </Link>
  )
}
