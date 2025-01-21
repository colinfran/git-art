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
import { getCreditsCount } from "@/lib/db/users/tasks"
import { auth } from "@/lib/auth"
import { ShoppingCartIcon } from "lucide-react"
import PurchaseAlert from "@/components/purchase-alert"

const Page: FC = async () => {
  const session = await auth()
  const creditsCount = await getCreditsCount(session.user)

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Credit Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {`${creditsCount} Credit${creditsCount > 1 || creditsCount === 0 ? "s" : ""}`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Credits</CardTitle>
            <CardDescription className="text-xl">Get 10 credits for $10</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Price: $10</p>
          </CardContent>
          <CardFooter>
            <form action="/api/checkout" method="POST">
              <input name="email" type="hidden" value={session.user.email} />
              <Button className="flex flex-row gap-2" type="submit">
                <ShoppingCartIcon size={16} />
                <span>Buy Now</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
      <PurchaseHistory />
      <PurchaseAlert />
    </div>
  )
}

export default Page
