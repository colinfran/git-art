import { eq } from "drizzle-orm"
import { db } from ".."
import { requests } from "./table"

export const addRequest = async (email: string): Promise<void> => {
  try {
    await db.insert(requests).values({
      email,
    })
  } catch (error) {
    console.error(error)
  }
}

export const removeRequest = async (email: string): Promise<void> => {
  try {
    await db.delete(requests).where(eq(requests.email, email))
  } catch (error) {
    console.error(error)
  }
}

export const checkIfRequestExists = async (email: string): Promise<boolean> => {
  try {
    const exists = await db.select().from(requests).where(eq(requests.email, email)).limit(1)
    return exists && exists.length > 0
  } catch (error) {
    console.error("Error checking if user exists", error)
    return false
  }
}
