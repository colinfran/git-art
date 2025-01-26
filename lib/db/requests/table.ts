import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { users } from "../users/table"

// Define the users table
export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  gitId: text("git_id").references(() => users.gitId),
  inProgress: boolean("in_progress").default(true),
})
