import React, { FC } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const ImageGrid: FC = () => {
  // This would typically come from an API or database
  const images = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ]

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
