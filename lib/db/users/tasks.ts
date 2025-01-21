import { eq } from "drizzle-orm"
import { users } from "./table"
import { db } from "@/lib/db"
import { User } from "next-auth"

export type SelectUser = typeof users.$inferSelect

type NewUser = {
  username: string
  name: string
  email: string
  imageUrl: string | null
  gitId: string
}

export const doesUserExist = async (user: User): Promise<boolean | string> => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, user.login!))
      .limit(1)
    return existingUser && existingUser.length > 0
  } catch (error) {
    console.error("Error checking if user exists", error)
    return "error"
  }
}

export const createUser = async (user: NewUser): Promise<void> => {
  const { name, username, email, imageUrl, gitId } = user
  try {
    await db.insert(users).values({ username, name, email, imageUrl, gitId }).returning()
  } catch (error) {
    console.error("Error creating user", error)
  }
}

export const getTokenCount = async (user: User): Promise<number> => {
  try {
    const result = await db
      .select({ tokens: users.tokens })
      .from(users)
      .where(eq(users.username, user.login!))
    if (result.length > 0 && result[0].tokens) {
      return result[0].tokens
    } else {
      return 0
    }
  } catch (error) {
    console.error("Error checking if user exists", error)
    return 0
  }
}

export const updateTokenCount = async (user: User, newTokenCount: number): Promise<void> => {
  try {
    await db
      .update(users) // Use update instead of select
      .set({ tokens: newTokenCount }) // Set the new token count
      .where(eq(users.username, user.login!)) // Update based on the username
      .returning({ tokens: users.tokens }) // Return the updated token count
  } catch (error) {
    console.error("Error updating token count", error)
  }
}
