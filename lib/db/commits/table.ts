import { pgTable, text, timestamp, serial, integer, varchar } from "drizzle-orm/pg-core"
import { users } from "../users/table"

export const commits = pgTable("commits", {
  id: serial("id").primaryKey(),
  sha: text("sha").unique().notNull(),
  nodeId: text("node_id").notNull(),
  message: text("message").notNull(),
  commentCount: integer("comment_count").notNull(),
  authorUsername: varchar("author_username")
    .notNull()
    .references(() => users.username),
  createdAt: timestamp("created_at"),
})
