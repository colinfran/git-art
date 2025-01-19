import React, { FC } from "react"
import Link from "next/link"
import { Logo as VercelLogo } from "@/components/icons"
import { auth } from "@/lib/auth"

export const Logo: FC = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <Link href={user ? "/app" : "/"}>
      <VercelLogo />
    </Link>
  )
}
