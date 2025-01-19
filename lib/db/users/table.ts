import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core"

// Define the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
