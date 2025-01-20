"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import ZoomableImage from "./zoomable-image"

const ITEMS_PER_PAGE = 6

type Props = {
  images: string[]
}

const ImageGridPagination: FC<Props> = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(images.length === 0 ? 0 : 1)
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-4">
      {visibleImages.length === 0 && (
        <div className="text-center">
          <Button asChild>
            <Link href="/generate">Generate your first image</Link>
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
                className="rounded-md object-cover"
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
          <ChevronLeft className="mr-2 size-4" />
          Previous
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
          Next
          <ChevronRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}

export default ImageGridPagination
