import { getSessionUser } from "@/lib/auth/session"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const priceId = process.env.STRIPE_PRICE_ID!

/**
 * Starts a Stripe checkout for credits for the signed-in user (submitted by the form on
 * /credits). The gitId the webhook credits comes from the session, not the form.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const user = await getSessionUser()
  if (!user) return NextResponse.redirect(new URL("/", req.url), 303)

  const origin = req.headers.get("origin") || req.nextUrl.origin
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        },
      ],
      customer_email: user.email || undefined,
      mode: "payment",
      success_url: `${origin}/credits?success=true`,
      cancel_url: `${origin}/credits?canceled=true`,
      metadata: {
        gitId: user.gitId,
      },
    })

    return NextResponse.redirect(`${session.url}`, 303)
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 })
  }
}
