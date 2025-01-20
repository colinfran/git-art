import { db } from "@/lib/db"
import { and, eq, gte, lt } from "drizzle-orm"
import { images } from "./table"

export const hasUserCreatedImageToday = async (userId: string): Promise<boolean> => {
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))
  const response = await db
    .select()
    .from(images)
    .where(
      and(
        eq(images.userId, userId),
        gte(images.createdAt, startOfDay),
        lt(images.createdAt, endOfDay),
      ),
    )
    .limit(1) // We only need to know if at least one image exists

  return response.length > 0
}

export const addImage = async (userId: string, imageUrl: string): Promise<void> => {
  try {
    const createdAt = new Date()
    await db.insert(images).values({
      userId,
      imageUrl,
      createdAt,
    })
  } catch (error) {
    console.error(error)
  }
}
