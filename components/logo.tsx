import Link from "next/link"
import { FC } from "react"
import { Logo as VercelLogo } from '@/components/icons';


export const Logo:FC = () => {
  return (
    <Link href="/">
      <VercelLogo />
    </Link>
  )
}