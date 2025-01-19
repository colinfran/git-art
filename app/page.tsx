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
    <div className="flex flex-col min-h-screen items-start justify-center p-8 md:items-center">
      <h1 className="mb-6 w-full text-center text-3xl font-bold">GitSong</h1>
      <h3 className="mb-6 max-w-[400px] text-center ml-auto mr-auto">GitSong transforms your GitHub activity into a unique song, turning your contributions into a creative soundtrack.</h3>
      <Card className="w-full max-w-sm ml-auto mr-auto">
        <CardHeader>
          {/* <CardTitle className="mb-6 text-center text-3xl font-bold">GitSong</CardTitle> */}
          <CardDescription className="text-center">
            Sign up and let GitSong compose a melody that celebrates your achievements!
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
