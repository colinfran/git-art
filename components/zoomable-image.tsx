import React, { FC } from "react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./ui/image-dialog"
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
        <div className="relative flex text-clip rounded-md bg-transparent">
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
        <DialogClose asChild={true}>
          {/* <TvIcon className="flex flex-row justify-self-end" onClick={() => setDialogOpen(!dialogOpen)}/> */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default ZoomableImage
