import React, { FC } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  images: string[]
}

const ImageGrid: FC<Props> = ({ images }) => {
  return (
    <Card className="w-full max-w-[900px]">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div className="relative aspect-square" key={index}>
              <Image
                alt={`Generated image ${index + 1}`}
                className="rounded-md object-cover"
                src={src || "/placeholder.svg"}
                fill
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ImageGrid
