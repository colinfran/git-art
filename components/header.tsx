import React, { FC } from "react";
import { Session } from "next-auth";
import { Logo } from "@/components/logo"
import HeaderDropdown from "../components/header-dropdown"
import { auth } from "@/lib/auth";
import { getTokenCount } from "@/lib/db/users/tasks";

const Header:FC = async () => {
  const session = await auth()
  const tokenCount = await getTokenCount(session.user)
  return (
    <header className="sticky top-0 z-30 flex h-[50px] items-center gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
      <Logo />
      
      {session?.user && (
        <div className="flex w-full justify-end items-center gap-8">
          <div>Tokens: {tokenCount}</div>
          <HeaderDropdown />
        </div>
      )}
    </header>
  )
}

export default Header