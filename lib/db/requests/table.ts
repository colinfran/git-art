import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { users } from "../users/table"

// Define the users table
export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").references(() => users.email),
  inProgress: boolean("in_progress").default(true),
})
