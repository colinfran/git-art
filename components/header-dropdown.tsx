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
import { ImageIcon, ShoppingCartIcon } from "lucide-react"

const HeaderDropdown: FC = async () => {
  const session = await auth()
  const user = session?.user
  return (
    <div className="">
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
          <DropdownMenuItem
            className="flex w-full cursor-pointer flex-row items-center gap-2"
            asChild
          >
            <Link href="/images" prefetch>
              <ImageIcon size={16} />
              <span>My Images</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full cursor-pointer flex-row items-center gap-2"
            asChild
          >
            <Link href="/credits">
              <ShoppingCartIcon size={16} />
              <span>Purchase Credits</span>
            </Link>
          </DropdownMenuItem>
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
