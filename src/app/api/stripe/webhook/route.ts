import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { widgets } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events
 */
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Stripe configuration missing" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
          stripe
        );
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  stripe: Stripe
) {
  const widgetId = parseInt(session.metadata?.widgetId || "0", 10);

  if (!widgetId) {
    console.error("No widgetId in checkout session metadata");
    return;
  }

  const subscriptionId = session.subscription as string | null;

  if (!subscriptionId) {
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await upsertSubscriptionFromStripe(
    subscription,
    widgetId,
    session.metadata ?? undefined
  );
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const widgetId = parseInt(subscription.metadata?.widgetId || "0", 10);

  if (!widgetId) {
    return;
  }

  await upsertSubscriptionFromStripe(
    subscription,
    widgetId,
    subscription.metadata ?? undefined
  );
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const existingWidget = await db.query.widgets.findFirst({
    where: (w, { eq }) =>
      eq(w.stripeSubscriptionId, subscription.id),
  });

  if (existingWidget) {
    await db
      .update(widgets)
      .set({
        subscriptionStatus: "canceled",
        updatedAt: new Date(),
      })
      .where(eq(widgets.id, existingWidget.id));
  }
}

async function upsertSubscriptionFromStripe(
  subscription: Stripe.Subscription,
  widgetId: number,
  metadata?: Stripe.Metadata
) {
  const existing = await db.query.widgets.findFirst({
    where: (w, { eq }) => eq(w.id, widgetId),
  });

  const planName = metadata?.planName || "starter";
  const price = metadata?.price ? parseInt(metadata.price, 10) : 500;
  const interval = metadata?.interval || "month";
  const reviewRefreshHours = metadata?.reviewRefreshHours
    ? parseInt(metadata.reviewRefreshHours, 10)
    : 24;

  const payload = {
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status as string,
    cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
    planName,
    price,
    interval,
    reviewRefreshHours,
    updatedAt: new Date(),
  };

  if (existing) {
    await db.update(widgets).set(payload).where(eq(widgets.id, existing.id));
  }
}
