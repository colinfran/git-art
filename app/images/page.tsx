import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { getImages } from "@/lib/db/images/tasks"
import ImageGridPagination from "@/components/image-grid-pagination"

const Page: FC = async () => {
  const session = await auth()
  const images = await getImages(session.user.gitId)
  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <Card className="mx-auto w-full max-w-[900px]">
        <CardHeader>
          <CardTitle>All Image Generations</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageGridPagination images={images} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
