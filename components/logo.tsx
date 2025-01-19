import Link from "next/link"
import { FC } from "react"
import { Logo as VercelLogo } from '@/components/icons';
import { auth } from "@/lib/auth";


export const Logo:FC = async () => {
  let session = await auth();
  let user = session?.user;

  return (
    <Link href={user ? "/app" : "/"}>
      <VercelLogo />
    </Link>
  )
}