"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import Loader from "@/components/loader"
import { useRouter } from "next/navigation"
import { useImageStatus } from "app/providers/image-status-provider"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"

type ImageDataProps = {
  url?: string
  outOfCredits?: boolean
  requestAlreadyInProgress?: boolean
  error?: boolean
}

const Page: FC = () => {
  const router = useRouter()
  const { data: untypedSession } = useSession()
  const [imageData, setImageData] = useState<ImageDataProps>({ error: false })
  const session = untypedSession as Session & { user: { gitId?: string; login?: string } }
  const [isLoading, setIsLoading] = useState(true)
  const { setShouldFetchStatus } = useImageStatus()

  useEffect(() => {
    async function loadImage(): Promise<void> {
      try {
        setShouldFetchStatus(true)
        toast(
          () => (
            <div className="flex w-full flex-row items-center gap-4 p-4">
              <Loader2 className="animate-spin text-blue-500" />
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      Image generation is currently in progress
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Please wait.</p>
                </div>
              </div>
            </div>
          ),
          { toastId: "in-progress-toast", autoClose: false, closeButton: false },
        )
        const response = await fetch("/api/image/generate", {
          method: "POST",
          body: JSON.stringify({ ...session?.user }),
        })
        const result = await response.json()
        if (result?.requestAlreadyInProgress) {
          setImageData({ requestAlreadyInProgress: true })
          setIsLoading(false)
        }
        if (result?.outOfCredits) {
          setImageData({ outOfCredits: true })
          setIsLoading(false)
          setShouldFetchStatus(false)
        }
        if (result?.image?.data[0].url) {
          setImageData({ url: result.image.data[0].url })
          router.refresh()
        }
      } catch (error) {
        console.error("Failed to generate image:", error)
        setImageData({ error: true })
        setIsLoading(false)
        setShouldFetchStatus(false)
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
            {imageData.outOfCredits || imageData.requestAlreadyInProgress ? (
              <div className="text-center">
                {imageData.outOfCredits && "You have ran out of image generation credits."}
                {imageData.requestAlreadyInProgress &&
                  "There is currently an image being generated."}
                <br />
                {imageData.outOfCredits && "Please purchase more credits and try again."}
                {imageData.requestAlreadyInProgress &&
                  "Please wait a minute to generate another image."}
              </div>
            ) : (
              <>
                <div className={`${isLoading ? "" : "hidden"} relative`}>
                  <Skeleton className="size-[75vw] md:size-[75vh]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                  </div>
                </div>
                {imageData?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="new generated art"
                    className={`${isLoading ? "hidden" : ""} mx-auto size-[75vw] rounded-lg shadow-lg md:size-[75vh]`}
                    src={imageData.url}
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
