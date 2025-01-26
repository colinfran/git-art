import { eq, sql } from "drizzle-orm"
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

export const doesUserExist = async (user: NewUser): Promise<boolean | string> => {
  try {
    const existingUser = await db.select().from(users).where(eq(users.gitId, user.gitId!)).limit(1)
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
      .where(eq(users.gitId, user.gitId))
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

export const updateCreditsCount = async (gitId: string, count: number): Promise<void> => {
  try {
    await db
      .update(users)
      .set({ credits: sql`${users.credits} + ${count}` })
      .where(eq(users.gitId, gitId))
  } catch (error) {
    console.error("Error updating credits count", error)
  }
}
