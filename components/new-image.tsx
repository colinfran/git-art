import React, { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  alreadyGeneratedToday: boolean
}

const NewImage: FC<Props> = async ({ alreadyGeneratedToday }) => {
  return (
    <Card className="w-full max-w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">
          {alreadyGeneratedToday
            ? "Sorry, you already generated an image today."
            : "Generate New Image"}
        </CardTitle>
        <CardDescription className="text-center">
          {alreadyGeneratedToday
            ? "Come back tomorrow to generate a new image."
            : "Generate an image using your coding contributions and commit history."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {!alreadyGeneratedToday && (
          <Button asChild /*onClick={handleGenerate} disabled={isGenerating}*/>
            <Link href="/generate">{"Generate"}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default NewImage
