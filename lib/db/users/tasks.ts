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
  const { name, username, email, imageUrl } = user
  try {
    await db.insert(users).values({ username, name, email, imageUrl }).returning()
  } catch (error) {
    console.error("Error creating user", error)
  }
}
