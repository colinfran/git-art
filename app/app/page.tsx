"use client"
import React, { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { User } from "next-auth"

const Page: FC = () => {
  const [gitData, setGitData] = useState<undefined | []>(undefined)
  const { data: session } = useSession()
  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const user = (session!.user! as User).login
      const email = session!.user!.email
      const gitId = (session!.user! as User).gitId
      const response = await fetch("/api/fetch-github-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, email, gitId }),
      })
      const data = await response.json()
      setGitData(data.commits)
    }
    if (session?.user && session !== null) {
      getUserData()
    }
  }, [session])

  return (
    <div className="mt-[64px] flex border p-8">
      {gitData ? (
        gitData.length > 0 ? (
          <div>Loaded</div>
        ) : (
          <div>No data exists for this user</div>
        )
      ) : (
        <Loader2 className="mr-2 size-4 animate-spin" />
      )}
    </div>
  )
}

export default Page
