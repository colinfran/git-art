"use client"

import React, { FC, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "./ui/image-dialog"
import Image, { ImageProps } from "next/image"
import { Button } from "./ui/button"
import { DownloadIcon, Loader2 } from "lucide-react"
import uniqid from "uniqid"

const ZoomableImage: FC<ImageProps> = ({ src, alt, className, ...props }) => {
  const [loading, setLoading] = useState(false)

  if (!src) return null

  const handleDownload = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(src as string)
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
      setLoading(false)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          {...props}
          alt={alt || ""}
          className={`${className} cursor-pointer`}
          height={100}
          sizes="100vw"
          src={src}
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
        />
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">Image</DialogTitle>
        <div className="relative flex flex-col text-clip rounded-md bg-transparent">
          <Image
            {...props}
            alt={alt || ""}
            className={"m-auto w-full max-w-[500px] p-4 sm:p-0"}
            height={100}
            sizes="100vw"
            src={src}
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
          />
        </div>
        <DialogFooter>
          <Button className="mx-auto flex w-[200px] flex-row gap-2" onClick={handleDownload}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : <DownloadIcon size={16} />}
            <span>Download</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ZoomableImage
