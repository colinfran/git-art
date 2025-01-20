import React, { FC } from "react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./ui/image-dialog"
import Image, { ImageProps } from "next/image"
import { TvIcon, XIcon } from "lucide-react"

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
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <DialogTitle className="sr-only">Image</DialogTitle>
        <div className="flex relative text-clip rounded-md bg-transparent shadow-md">
          <Image
            {...props} 
            alt={alt || ""} 
            className={"w-full max-w-[500px] m-auto"} 
            src={src} 
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            height={100}
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
