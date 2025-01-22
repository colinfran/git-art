import React, { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const NewImageInProgress: FC = async () => {
  return (
    <Card className="w-full max-w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">{"Please wait."}</CardTitle>
        <CardDescription className="text-center">
          {"There is currently an image generation in progress."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {"Please wait a minute a refresh the page."}
      </CardContent>
    </Card>
  )
}

export default NewImageInProgress
