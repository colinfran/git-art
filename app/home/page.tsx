import React, { FC } from "react"
import ImageGrid from "@/components/image-grid"
import NewImage from "@/components/new-image"
import { auth } from "@/lib/auth"
import { getImages as gitRecentImages } from "@/lib/db/images/tasks"

const Page: FC = async () => {
  const session = await auth()
  const images = await gitRecentImages(session.user.gitId)
  const alreadyGeneratedToday = false
  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <NewImage alreadyGeneratedToday={alreadyGeneratedToday} />
      {images.length > 0 && <ImageGrid images={images} />}
    </div>
  )
}

export default Page
