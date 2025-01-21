import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "../users/table"

// Define the users table
export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").references(() => users.email),
  amount: integer("amount").default(10),
  status: text("status"),
  date: timestamp("date").notNull().defaultNow(),
  sessionId: text("session_id"),
})
