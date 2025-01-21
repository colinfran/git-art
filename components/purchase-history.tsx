"use client"
import React, { FC, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Skeleton } from "./ui/skeleton"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"

type Purchase = {
  id: string
  date: string
  amount: number
  cost: number
}

const PurchaseHistory: FC = () => {
  const { data: untypedSession } = useSession()
  const session = untypedSession as Session & { user: { gitId?: string; login?: string } }

  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[] | undefined>(undefined)

  const fetchPurchaseHistory = async (): Promise<void> => {
    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        body: JSON.stringify({ ...session?.user }),
      })
      const { purchases } = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values = purchases.map((item: any) => ({
        ...item,
        cost: "$10",
      }))
      setPurchaseHistory(values)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPurchaseHistory()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    <TableCell>{purchase.amount} Credits</TableCell>
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
