import React, { FC } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image, { ImageProps } from "next/image"

const ZoomableImage: FC<ImageProps> = ({ src, alt, className, ...props }) => {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          {...props}
          alt={alt || ""}
          className={className}
          fill={false}
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
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <DialogTitle className="sr-only">Image</DialogTitle>
        <div className="relative h-[calc(100vh-220px)] w-full text-clip rounded-md bg-transparent shadow-md">
          <Image {...props} alt={alt || ""} className={className} src={src} fill />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ZoomableImage
