import { eq } from "drizzle-orm"
import { db } from ".."
import { requests } from "./table"

export const addRequest = async (gitId: string): Promise<void> => {
  try {
    await db.insert(requests).values({
      gitId,
    })
  } catch (error) {
    console.error(error)
  }
}

export const removeRequest = async (gitId: string): Promise<void> => {
  try {
    await db.delete(requests).where(eq(requests.gitId, gitId))
  } catch (error) {
    console.error(error)
  }
}

export const checkIfRequestExists = async (gitId: string): Promise<boolean> => {
  try {
    const exists = await db.select().from(requests).where(eq(requests.gitId, gitId)).limit(1)
    return exists && exists.length > 0
  } catch (error) {
    console.error("Error checking if user exists", error)
    return false
  }
}
