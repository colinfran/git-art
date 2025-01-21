import React, { FC } from "react"
import ImageGrid from "@/components/image-grid"
import NewImage from "@/components/new-image"
import { auth } from "@/lib/auth"
import { getRecentImages } from "@/lib/db/images/tasks"
import { getTokenCount } from "@/lib/db/users/tasks"

const Page: FC = async () => {
  const session = await auth()
  const images = await getRecentImages(session.user.gitId)
  // const alreadyGeneratedToday = await hasUserCreatedImageToday(session.user.gitId)
  const tokenCount = await getTokenCount(session.user)
  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      <NewImage tokenCount={tokenCount} />
      {images.length > 0 && <ImageGrid images={images} />}
    </div>
  )
}

export default Page
