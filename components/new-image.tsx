import React, { FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  creditsCount: number
}

const NewImage: FC<Props> = async ({ creditsCount }) => {
  const hasCredits = creditsCount > 0
  return (
    <Card className="w-full max-w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">
          {hasCredits ? "Generate New Image" : "Sorry, you have ran out of credits."}
        </CardTitle>
        <CardDescription className="text-center">
          {hasCredits
            ? "Generate an image using your coding contributions and commit history."
            : "To generate more images, please purchase more credits."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {hasCredits && (
          <Button asChild>
            <Link href="/generate">{"Generate"}</Link>
          </Button>
        )}
      </CardContent>
      { hasCredits && (
        <CardFooter className="flex justify-center">
          <CardDescription>
            Fee: 1 credit
          </CardDescription>
        </CardFooter>
        )}
    </Card>
  )
}

export default NewImage
