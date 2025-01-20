import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "../users/table"

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at"),
  imageUrl: text("image_url").notNull(),
  gitId: text("git_id").references(() => users.gitId),
})
