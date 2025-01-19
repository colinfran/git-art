"use client"

import React, { FC, useState } from "react"
import { logout } from "@/lib/auth/actions"
import { Loader2, LogOut } from "lucide-react"

const LogOutButton: FC = () => {
  const [loading, setLoading] = useState(false)
  const onClick = (): void => {
    setLoading(true)
    logout()
  }
  return (
    <button className="flex w-full flex-row items-center gap-2" type="submit" onClick={onClick}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
      <span>Sign Out</span>
    </button>
  )
}

export default LogOutButton
