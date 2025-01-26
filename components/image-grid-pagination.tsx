"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import ZoomableImage from "./zoomable-image"
import { useRouter, useSearchParams } from "next/navigation"

const ITEMS_PER_PAGE = 6

type Props = {
  images: string[]
}

const ImageGridPagination: FC<Props> = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(images.length === 0 ? 0 : 1)
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const searchParams = useSearchParams()
  const router = useRouter()
  const firstImageRef = useRef<HTMLDivElement | null>(null) // Ref to first image div

  const newImage = searchParams.has("new-image")

  useEffect(() => {
    if (newImage) {
      router.replace(window.location.pathname)
      firstImageRef?.current?.click()
    }
  }, [newImage])

  return (
    <div className="space-y-4">
      {visibleImages.length === 0 && (
        <div className="text-center">
          <Button asChild>
            <Link href="/generate" prefetch>
              Generate your first image
            </Link>
          </Button>
        </div>
      )}
      <div className={visibleImages.length === 0 ? "!mt-[-40px]" : ""}>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {images.length === 0 && (
            <div className="invisible relative aspect-square">
              <Image
                alt={"placeholder image"}
                className="rounded-md object-cover"
                src="/placeholder.svg"
                fill
              />
            </div>
          )}
          {visibleImages.map((image, index) => (
            <div className="relative aspect-square" key={`${image}-${index}`}>
              <ZoomableImage
                alt={`Generated image ${image}`}
                firstImageRef={index === 0 ? firstImageRef : undefined}
                src={image || "/placeholder.svg"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          disabled={currentPage === 1 || images.length === 0}
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages || images.length === 0}
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default ImageGridPagination
