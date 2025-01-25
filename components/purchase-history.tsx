
import React, { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { auth } from "@/lib/auth"
import { getAllPurchases } from "@/lib/db/purchases/tasks"

type Purchase = {
  id: string
  date: string
  amount: number
  cost: number
}

type Props = {
  purchaseHistory: Purchase[]
}


const PurchaseHistory: FC<Props> = async ({ purchaseHistory }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        {purchaseHistory && (
          <div className="max-h-[300px] min-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseHistory.map((purchase: Purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{new Date(purchase.date).toLocaleString()}</TableCell>
                    <TableCell>{purchase.amount} Credits</TableCell>
                    <TableCell>{purchase.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PurchaseHistory
