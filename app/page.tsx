"use client"
import React, { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2 } from "lucide-react"
import { authenticate } from "@/lib/auth/actions"
import Link from "next/link"

const Page: FC = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = (): void => {
    setLoading(true)
    authenticate()
  }
  return (
    <div className="flex min-h-screen items-start justify-center p-8 md:items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="mb-6 text-center text-3xl font-bold">GitSong</CardTitle>
          <CardDescription>
            Connect your GitHub account to access amazing features and collaborate with developers
            around the world!
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
