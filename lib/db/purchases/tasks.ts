import { eq, desc } from "drizzle-orm"
import { db } from ".."
import { purchases } from "./table"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPurchase = async (data: any): Promise<void> => {
  try {
    await db.insert(purchases).values({
      gitId: data.gitId,
      email: data.email,
      amount: data.amount,
      status: data.status,
      sessionId: data.sessionId,
    })
  } catch (error) {
    console.error(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllPurchases = async (data: any): Promise<any> => {
  const response = await db
    .select()
    .from(purchases)
    .where(eq(purchases.gitId, data.gitId))
    .orderBy(desc(purchases.date))

  return response
}
