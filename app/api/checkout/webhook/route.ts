import { addPurchase, hasPurchase } from "@/lib/db/purchases/tasks"
import { updateCreditsCount } from "@/lib/db/users/tasks"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Stripe webhook. Adds credits when a checkout is completed and paid.
 * Requests must carry a valid Stripe signature.
 */
export const POST = async (req: Request): Promise<NextResponse> => {
  const signature = req.headers.get("stripe-signature") || ""
  const body = await req.text() // Raw body is needed to verify the signature

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error("Invalid Stripe webhook signature:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Acknowledge other event types so Stripe doesn't keep retrying them.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const gitId = session.metadata?.gitId
  if (session.payment_status !== "paid" || !gitId) {
    return NextResponse.json({ received: true })
  }

  // Stripe can deliver the same event more than once; only credit each checkout once.
  if (await hasPurchase(session.id)) {
    return NextResponse.json({ received: true })
  }

  const amountPaid = (session.amount_total || 0) / 100
  await addPurchase({
    gitId,
    email: session.customer_details?.email,
    amount: amountPaid,
    status: session.payment_status,
    sessionId: session.id,
  })
  await updateCreditsCount(gitId, amountPaid)
  return NextResponse.json({ received: true })
}
