import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// import { db } from "@/db";

/**
 * POST /api/stripe/portal
 * Creates a Stripe billing portal session
 * Body: { widgetId }
 */
export async function POST(req: NextRequest) {
  try {
    const { widgetId } = await req.json();

    if (!widgetId) {
      return NextResponse.json(
        { error: "widgetId is required" },
        { status: 400 }
      );
    }

    // const widget = await db.query.widgets.findFirst({
    //   where: (w, { eq }) => eq(w.publicId, widgetId),
    // });

    // if (!widget?.stripeSubscriptionId) {
    //   return NextResponse.json(
    //     { error: "Subscription not found" },
    //     { status: 404 }
    //   );
    // }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not set" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });

    console.log(stripe)

    // const stripeSubscription = await stripe.subscriptions.retrieve(
    //   widget.stripeSubscriptionId
    // );

    // const customerId = stripeSubscription.customer as string;

    // const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // const session = await stripe.billingPortal.sessions.create({
    //   customer: customerId,
    //   return_url: `${appUrl}/dashboard/billing`,
    // });

    // return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
