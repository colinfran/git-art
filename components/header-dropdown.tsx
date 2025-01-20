import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth/index"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogOutButton from "@/components/log-out-button"
import Link from "next/link"

const HeaderDropdown: FC = async () => {
  const session = await auth()
  const user = session?.user
  return (
    <div className="flex w-full justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
            <Image
              alt="Avatar"
              className="overflow-hidden rounded-full"
              height={36}
              src={user?.image ?? "/placeholder-user.jpg"}
              width={36}
              priority
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href="https://github.com/sponsors/colinfran">
            <DropdownMenuItem>Sponsor</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default HeaderDropdown
