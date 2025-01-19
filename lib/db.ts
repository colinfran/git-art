import "server-only"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { eq } from "drizzle-orm"

import { AdapterUser } from "next-auth/adapters"
import { User } from "next-auth"

export const db = drizzle(neon(process.env.POSTGRES_URL!))

// Define the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  githubId: text("github_id").unique().notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type SelectUser = typeof users.$inferSelect
export const insertUserSchema = createInsertSchema(users)

export const doesUserExist = async (user: User | AdapterUser): Promise<boolean | string> => {
  try {
    const existingUser = await db.select().from(users).where(eq(users.githubId, user.id!)).limit(1)
    return existingUser && existingUser.length > 0
  } catch (error) {
    console.error("Error checking if user exists", error)
    return "error"
  }
}

// Function to create a new user
type NewUser = {
  githubId: string
  username: string
  email: string
  imageUrl: string | null
}

export const createUser = async ({
  githubId,
  username,
  email,
  imageUrl,
}: NewUser): Promise<void> => {
  try {
    await db.insert(users).values({ githubId, username, email, imageUrl }).returning()
  } catch (error) {
    console.error("Error creating user", error)
  }
}
