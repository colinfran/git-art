import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)!
const priceId = process.env.STRIPE_PRICE_ID!

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const formData = await req.formData()
  const email = formData.get("email")

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Use the provided Price ID from the request body
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/credits?success=true`,
      cancel_url: `${req.headers.get("origin")}/credits?canceled=true`,
    })

    return NextResponse.redirect(`${session.url}`, 303) // Redirect to the Stripe session URL
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
