import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * POST /api/stripe/checkout
 * Creates a Stripe checkout session
 * Body: { widgetId, priceId, planName?, price?, interval?, widgetLimit?, reviewRefreshHours? }
 */
export async function POST(req: NextRequest) {
  try {
    const {
      widgetId,
      priceId,
      planName,
      price,
      interval,
      widgetLimit,
      reviewRefreshHours,
    } = await req.json();

    if (!widgetId || !priceId) {
      return NextResponse.json(
        { error: "widgetId and priceId are required" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create checkout session
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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      metadata: {
        widgetId: String(widgetId),
        planName: planName ? String(planName) : "",
        price: price ? String(price) : "",
        interval: interval ? String(interval) : "",
        widgetLimit: widgetLimit ? String(widgetLimit) : "",
        reviewRefreshHours: reviewRefreshHours ? String(reviewRefreshHours) : "",
      },
      subscription_data: {
        metadata: {
          widgetId: String(widgetId),
          planName: planName ? String(planName) : "",
          price: price ? String(price) : "",
          interval: interval ? String(interval) : "",
          widgetLimit: widgetLimit ? String(widgetLimit) : "",
          reviewRefreshHours: reviewRefreshHours ? String(reviewRefreshHours) : "",
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
