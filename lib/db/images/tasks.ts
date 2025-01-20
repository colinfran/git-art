import { db } from "@/lib/db"
import { and, desc, eq, gte, lt } from "drizzle-orm"
import { images } from "./table"

export const hasUserCreatedImageToday = async (gitId: string): Promise<boolean> => {
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))
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
    const createdAt = new Date()
    await db.insert(images).values({
      gitId,
      imageUrl,
      createdAt,
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
