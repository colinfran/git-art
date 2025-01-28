"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import React, { FC, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Loader from "@/components/loader"
import { useImage } from "app/providers/image-provider"
import useLocalStorage from "use-local-storage"
import { Button } from "@/components/ui/button"
import { CheckCircle, DownloadIcon, Loader2 } from "lucide-react"
import uniqid from "uniqid"
import ArtOptionsForm, { ArtOptions } from "@/components/art-options-form"
import { toast } from "react-toastify"
import Link from "next/link"

const Page: FC = () => {
  const { loading, setLoading, generateNewImage, imageData, setImageData } = useImage()
  const [_status, setStatus] = useLocalStorage("image-generation-status", "")
  const [_isReloaded, setIsReloaded] = useLocalStorage("reloaded", "")
  const [isLoading, setIsLoading] = useState(false)

  const [options, setOptions] = useState<ArtOptions>({
    style: "abstract",
    colorScheme: "vibrant",
    complexity: 50,
    theme: "technology",
    mood: "energetic",
    timeRepresentation: "linear",
    textureStyle: "smooth",
    animationStyle: "static",
    backgroundType: "solid",
    perspective: "2D",
  })

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

  const onGenerateClick = (): void => {
    setImageData({})
    setIsReloaded("")
    generateNewImage(options)
    setStatus("generating")
  }

  useEffect(() => {
    // if the user refreshed the page on the generation page, do not show
    // both done toast and done message, just show done message.
    if (imageData?.url === "refresh") {
      toast.dismiss("toast")
    }
  }, [imageData?.url])

  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex justify-center">
        {imageData ? (
          <>
            {imageData?.error ? (
              <p className="text-center text-red-600">
                Failed to generate image. Please try again later.
              </p>
            ) : (
              <div className="space-y-4">
                {imageData?.outOfCredits || imageData?.requestAlreadyInProgress ? (
                  <div className="text-center">
                    {imageData?.outOfCredits && "You have ran out of image generation credits."}
                    {imageData?.requestAlreadyInProgress &&
                      "There is currently an image being generated."}
                    <br />
                    {imageData?.outOfCredits && "Please purchase more credits and try again."}
                    {imageData?.requestAlreadyInProgress &&
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
                      <>
                        {imageData?.url === "refresh" ? (
                          <div>
                            <div className="flex w-full flex-row items-center gap-4 p-4">
                              <CheckCircle className="text-green-500" />
                              <div className="flex w-full flex-row gap-4">
                                <div className="w-full">
                                  <div className="mb-2 flex items-center space-x-2">
                                    <span className="text-sm font-medium">
                                      Image generation has completed
                                    </span>
                                  </div>
                                  <p className="text-sm">View your git commit art!</p>
                                </div>
                                <Button className="self-center" asChild>
                                  <Link
                                    className="min-w-fit"
                                    href="/images?new-image=true"
                                    onClick={() => toast.dismiss("toast")}
                                  >
                                    View
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
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
                  </>
                )}
                <div>
                  <Button
                    className={`mx-auto flex w-[200px] flex-row gap-2 ${imageData?.url && imageData.url !== "refresh" ? "" : "invisible"}`}
                    disabled={loading && isLoading}
                    onClick={handleDownload}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <DownloadIcon size={16} />
                    )}
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <ArtOptionsForm options={options} setOptions={setOptions} onGenerate={onGenerateClick} />
        )}
      </div>
    </div>
  )
}

export default Page
