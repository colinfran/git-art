import { addPurchase } from "@/lib/db/purchases/tasks"
import { updateCreditsCount } from "@/lib/db/users/tasks"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const POST = async (req: Request): Promise<NextResponse> => {
  const signature = req.headers.get("stripe-signature")!
  const body = await req.text() // Get the raw body to validate the webhook signature

  try {
    // Verify the event using Stripe's secret
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    // Handle the event: Only 'checkout.session.completed'
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract session details to store in DB
      const customerEmail = session.customer_details?.email
      const amountPaid = session.amount_total! / 100
      const paymentStatus = session.payment_status
      const sessionId = session.id
      const gitId = session.metadata!.gitId
      console.log("amountPaid", amountPaid)
      const data = {
        gitId: gitId,
        email: customerEmail,
        amount: amountPaid,
        status: paymentStatus,
        sessionId: sessionId,
      }
      await addPurchase(data)
      await updateCreditsCount(gitId, amountPaid!)
      return NextResponse.json({ status: 200 })
    } else {
      throw Error("Error")
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 400 })
  }
}
