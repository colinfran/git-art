"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import Loader from "@/components/loader"
import { useRouter } from "next/navigation"

const Page: FC = () => {
  const router = useRouter()
  const { data: untypedSession } = useSession()
  const [imageData, setImageData] = useState<{ url: string; outOfTokens: boolean } | null>(null)
  const session = untypedSession as Session & { user: { gitId?: string; login?: string } }
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function loadImage(): Promise<void> {
      try {
        const response = await fetch("/api/get-image", {
          method: "POST",
          body: JSON.stringify({ ...session?.user }),
        })
        const result = await response.json()
        if (result?.image?.data[0].url) {
          setImageData({ url: result.image.data[0].url, outOfTokens: false })
          router.refresh()
        }
        if (result?.outOfTokens) {
          setImageData({ url: "", outOfTokens: true })
        }
      } catch (error) {
        console.error("Failed to generate image:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      loadImage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex justify-center">
        {isLoading ? (
          <div className="relative">
            <Skeleton className="size-[75vw] md:size-[75vh]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          </div>
        ) : imageData ? (
          <div className="space-y-4">
            {imageData.outOfTokens ? (
              <div className="text-center">
                You have ran out of image generation tokens.
                <br />
                Please purchase more tokens and try again.
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
