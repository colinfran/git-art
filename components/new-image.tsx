import React, { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  tokenCount: number
}

const NewImage: FC<Props> = async ({ tokenCount }) => {
  const hasTokens = tokenCount > 0
  return (
    <Card className="w-full max-w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">
          {hasTokens ? "Generate New Image" : "Sorry, you have ran out of tokens."}
        </CardTitle>
        <CardDescription className="text-center">
          {hasTokens
            ? "Generate an image using your coding contributions and commit history."
            : "To generate more images, please purchase more tokens."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {hasTokens && (
          <Button asChild>
            <Link href="/generate">{"Generate"}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default NewImage
