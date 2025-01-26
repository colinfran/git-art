import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "../users/table"

// Define the users table
export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  gitId: text("git_id").references(() => users.gitId),
  amount: integer("amount").default(10),
  status: text("status"),
  date: timestamp("date").notNull().defaultNow(),
  sessionId: text("session_id"),
})
