import { getAllPurchases } from "@/lib/db/purchases/tasks"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json()
  const purchases = await getAllPurchases(data)
  return NextResponse.json({ purchases })
}
