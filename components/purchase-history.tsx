"use client"
import React, { FC, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Skeleton } from "./ui/skeleton"
import uniqid from "uniqid"

type Purchase = {
  id: string
  date: string
  amount: number
  cost: number
}

const PurchaseHistory: FC = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[] | undefined>(undefined)

  const fetchPurchaseHistory = async (): Promise<void> => {
    // fetch purchase history
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setPurchaseHistory([
      { id: uniqid(), date: "2023-06-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-15", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
      { id: uniqid(), date: "2023-05-01", amount: 10, cost: 10 },
    ])
  }

  useEffect(() => {
    fetchPurchaseHistory()
  }, [])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        {purchaseHistory === undefined && <Skeleton className="h-[398px] space-y-1.5 p-6" />}
        {purchaseHistory && (
          <div className="max-h-[300px] min-h-[300px] overflow-y-auto">
            {" "}
            {/* Scrollable wrapper */}
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
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>{purchase.amount} Tokens</TableCell>
                    <TableCell>${purchase.cost}</TableCell>
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
