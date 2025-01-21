import { db } from "@/lib/db"
import { and, desc, eq, gte, lt } from "drizzle-orm"
import { images } from "./table"

type RangeProps = { startOfDay: Date, endOfDay: Date }

const getUTCDayRange = (): RangeProps => {
  const now = new Date()
  const startOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0),
  )
  const endOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999),
  )
  return { startOfDay, endOfDay }
}

export const hasUserCreatedImageToday = async (gitId: string): Promise<boolean> => {
  const { startOfDay, endOfDay } = getUTCDayRange()
  const response = await db
    .select()
    .from(images)
    .where(
      and(
        eq(images.gitId, gitId),
        gte(images.createdAt, startOfDay),
        lt(images.createdAt, endOfDay),
      ),
    )
    .limit(1) // We only need to know if at least one image exists

  return response.length > 0
}

export const addImage = async (gitId: string, imageUrl: string): Promise<void> => {
  try {
    await db.insert(images).values({
      gitId,
      imageUrl,
    })
  } catch (error) {
    console.error(error)
  }
}

export const getImages = async (gitId: string): Promise<string[]> => {
  const response = await db
    .select({ imageUrl: images.imageUrl })
    .from(images)
    .where(eq(images.gitId, gitId))
    .orderBy(desc(images.createdAt))

  const imageUrls = response.map((row) => row.imageUrl)
  return imageUrls
}

export const getRecentImages = async (gitId: string): Promise<string[]> => {
  const response = await db
    .select({ imageUrl: images.imageUrl })
    .from(images)
    .where(eq(images.gitId, gitId))
    .orderBy(desc(images.createdAt))
    .limit(3)
  const imageUrls = response.map((row) => row.imageUrl)
  return imageUrls
}
