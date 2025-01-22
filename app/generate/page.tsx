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
  const [imageData, setImageData] = useState<{
    url: string
    outOfCredits: boolean
    error: boolean
  }>({ error: false })
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
        if (result?.outOfCredits) {
          setImageData({ url: "", outOfCredits: true, error: false })
          setIsLoading(false)
        }
        if (result?.image?.data[0].url) {
          setImageData({ url: result.image.data[0].url, outOfCredits: false, error: false })
          router.refresh()
        }
      } catch (error) {
        console.error("Failed to generate image:", error)
        setImageData({ error: true, url: "", outOfCredits: false })
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
        {imageData.error ? (
          <p className="text-center text-red-600">
            Failed to generate image. Please try again later.
          </p>
        ) : (
          <div className="space-y-4">
            {imageData.outOfCredits ? (
              <div className="text-center">
                You have ran out of image generation credits.
                <br />
                Please purchase more credits and try again.
              </div>
            ) : (
              <>
                <div className={`${isLoading ? "" : "hidden"} relative`}>
                  <Skeleton className="size-[75vw] md:size-[75vh]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="new generated art"
                  className={`${isLoading ? "hidden" : ""} mx-auto size-[75vw] rounded-lg shadow-lg md:size-[75vh]`}
                  src={imageData.url || "/placeholder.svg"}
                  onLoad={() => setIsLoading(false)}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
