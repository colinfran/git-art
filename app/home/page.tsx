"use client"
import React, { FC } from "react"
import ImageGrid from "@/components/image-grid"
import NewImage from "@/components/new-image"

const Page: FC = () => {
  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <NewImage />
      <ImageGrid />
    </div>
  )
}

export default Page
