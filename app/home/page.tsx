import React, { FC } from "react"
import ImageGrid from "@/components/image-grid"
import NewImage from "@/components/new-image"
import { auth } from "@/lib/auth"
import { getRecentImages } from "@/lib/db/images/tasks"
import { getCreditsCount } from "@/lib/db/users/tasks"
import { checkIfRequestExists } from "@/lib/db/requests/tasks"
import NewImageInProgress from "@/components/new-image-in-progress"

const Page: FC = async () => {
  const session = await auth()
  const images = await getRecentImages(session.user.gitId)
  const requestInProgress = await checkIfRequestExists(session.user.email)
  // const alreadyGeneratedToday = await hasUserCreatedImageToday(session.user.gitId)
  const creditsCount = await getCreditsCount(session.user)
  return (
    <div className="mx-[2px] mt-2 flex flex-col items-center justify-center gap-8 p-8">
      {requestInProgress && <NewImageInProgress />}
      {!requestInProgress && <NewImage creditsCount={creditsCount} />}
      {images.length > 0 && <ImageGrid images={images} />}
    </div>
  )
}

export default Page
