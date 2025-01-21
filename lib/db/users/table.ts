import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

// Define the users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  gitId: text("git_id").notNull(),
  credits: integer("credits").default(3),
})
