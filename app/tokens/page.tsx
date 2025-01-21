import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PurchaseHistory from "@/components/purchase-history"
import { getTokenCount } from "@/lib/db/users/tasks"
import { auth } from "@/lib/auth"

const Page: FC = async () => {
  const session = await auth()
  const tokenCount = await getTokenCount(session.user)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">Token Purchase</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Token Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {`${tokenCount} Token${tokenCount > 1 || tokenCount === 0 ? "s" : ""}`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Tokens</CardTitle>
            <CardDescription className="text-xl">Get 10 tokens for $10</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Price: $10</p>
          </CardContent>
          <CardFooter>
            <Button>Buy Now</Button>
          </CardFooter>
        </Card>
      </div>

      <PurchaseHistory />
    </div>
  )
}

export default Page
