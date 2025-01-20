import React, { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const NewImage: FC = () => {
  const alreadyGeneratedToday = false

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
          <Button /*onClick={handleGenerate} disabled={isGenerating}*/>
            {/* {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Random Image"
          )} */}
            {"Generate"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default NewImage
