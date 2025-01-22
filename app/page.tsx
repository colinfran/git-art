"use client"
import React, { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Github, Loader2 } from "lucide-react"
import { authenticate } from "@/lib/auth/actions"
import Link from "next/link"
import { Logo } from "@/components/icons"
import Icon from "@/components/icon"

const Page: FC = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = (): void => {
    setLoading(true)
    authenticate()
  }
  return (
    <div className="mx-[2px] flex flex-col items-start p-8 md:items-center">
      <div className="flex w-full justify-center">
        <Icon size={108} />
      </div>
      <h1 className="mb-6 w-full text-center text-3xl font-bold">GitArt</h1>
      <h3 className="mx-auto mb-6 max-w-[400px] text-center">
        GitArt transforms your GitHub activity into a visual masterpiece, turning your coding
        contributions into captivating artwork.
      </h3>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardDescription className="text-center">
            Sign up and let GitArt create a visual masterpiece that celebrates your coding
            achievements!
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col">
          <Button className="flex w-full gap-2" disabled={loading} onClick={onSubmit}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Github size={16} />}
            <span>Sign in with GitHub</span>
          </Button>

          <p className="mt-6 text-center text-xs text-gray-500">
            By logging in, you agree to our{" "}
            <Link className="underline" href="/terms" prefetch>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/privacy" prefetch>
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
