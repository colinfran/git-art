"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "next-auth/react"
const Page: FC = () => {
  const { data: session } = useSession()
  const [imageData, setImageData] = useState<{ url: string; alreadyGenerated: boolean } | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function loadImage(): Promise<void> {
      try {
        const response = await fetch("/api/get-image", {
          method: "POST",
          body: JSON.stringify({
            gitId: session?.user!.gitId!,
            username: session?.user!.login!,
            email: session?.user!.email!,
          }),
        })
        const result = await response.json()
        if (result?.image.data[0].url) {
          setImageData({ url: result.image.data[0].url, alreadyGenerated: false })
        }
        if (result?.alreadyGenerated) {
          setImageData({ url: "", alreadyGenerated: true })
        }
        // await new Promise((resolve) => setTimeout(resolve, 3000))
        // setImageData({ url: "/placeholder.svg", alreadyGenerated: false })
      } catch (error) {
        console.error("Failed to generate image:", error)
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      loadImage()
    }
  }, [session])

  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex justify-center">
        {isLoading ? (
          <Skeleton className="size-[75vw] md:size-[75vh]" />
        ) : imageData ? (
          <div className="space-y-4">
            {imageData.alreadyGenerated ? (
              <div>
                You have already generated a GitArt image today. Please wait until tomorrow and try
                again.
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                className="mx-auto size-[75vw] rounded-lg shadow-lg md:size-[75vh]"
                src={imageData.url || "/placeholder.svg"}
              />
            )}
          </div>
        ) : (
          <p className="text-center text-red-600">
            Failed to generate image. Please try again later.
          </p>
        )}
      </div>
    </div>
  )
}

export default Page
