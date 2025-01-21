import { eq, or, sql, } from "drizzle-orm"
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

export const getCreditsCount = async (user: User): Promise<number> => {
  try {
    const result = await db
      .select({ credits: users.credits })
      .from(users)
      .where(eq(users.username, user.login!))
    if (result.length > 0 && result[0].credits) {
      return result[0].credits
    } else {
      return 0
    }
  } catch (error) {
    console.error("Error checking if user exists", error)
    return 0
  }
}

export const updateCreditsCount = async (user: User, count: number): Promise<void> => {
  try {
    await db
      .update(users) // Use update instead of select
      .set({ credits: sql`${users.credits} + ${count}`})
      .where(
        or(
          eq(users.username, user.login!),
          eq(users.email, user.email!)
        )
      ) // Update based on the username
  } catch (error) {
    console.error("Error updating credits count", error)
  }
}

