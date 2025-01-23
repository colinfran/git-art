"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "next-auth/react"
import Loader from "@/components/loader"
import { useImage } from "app/providers/image-provider"
import useLocalStorage from "use-local-storage"
import { Button } from "@/components/ui/button"
import { DownloadIcon, Loader2 } from "lucide-react"
import uniqid from "uniqid"

const Page: FC = () => {
  const { loading, setLoading, generateNewImage, imageData } = useImage()
  const { data: session } = useSession()
  const [_status, setStatus] = useLocalStorage("image-generation-status", "")
  const [_isReloaded, setIsReloaded] = useLocalStorage("reloaded", "")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setIsReloaded("")
      generateNewImage()
      setStatus("generating")
    }
  }, [session])

  const handleDownload = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await fetch(imageData?.url as string)
      if (!response.ok) {
        throw new Error("Failed to fetch the image")
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = uniqid.time()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      setIsLoading(false)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

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
                <div className={`${loading ? "" : "hidden"} relative`}>
                  <Skeleton className="size-[75vw] md:size-[75vh]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                  </div>
                </div>
                {imageData?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="new generated art"
                    className={`${loading ? "hidden" : ""} mx-auto size-[75vw] rounded-lg shadow-lg md:size-[75vh]`}
                    src={imageData.url}
                    onLoad={() => setLoading(false)}
                  />
                )}
              </>
            )}
            <div>
            <Button
              className={`mx-auto flex w-[200px] flex-row gap-2 ${imageData.url ? "" : "invisible"}`}
              disabled={loading && isLoading}
              onClick={handleDownload}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <DownloadIcon size={16} />}
              <span>Download</span>
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
