import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { widgets } from "@/db/schema";
// import { lt, or, isNull, eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/cron/refresh-reviews
 * Refreshes reviews for widgets that need updating
 * Should be called via Vercel Cron
 */
export async function POST(req: NextRequest) {
  try {
    console.log(req);
    // Verify cron secret
    // const authHeader = req.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const refreshHours =
    //   parseInt(process.env.GOOGLE_PLACES_REFRESH_HOURS || "24", 10);
    // const cutoffTime = new Date(Date.now() - refreshHours * 60 * 60 * 1000);

    // // Find widgets that need refresh
    // const widgetsToRefresh = await db.query.widgets.findMany({
    //   where: (widgets, { or, isNull, lt }) =>
    //     or(isNull(widgets.cachedAt), lt(widgets.cachedAt, cutoffTime)),
    //   limit: 50,
    // });

    // const results = {
    //   success: 0,
    //   failed: 0,
    //   skipped: 0,
    // };

    // for (const widget of widgetsToRefresh) {
    //   try {
    //     const reviewsData = await fetchPlaceReviews(widget.placeId);

    //     await db
    //       .update(widgets)
    //       .set({
    //         cachedData: {
    //           rating: reviewsData.rating,
    //           userRatingsTotal: reviewsData.userRatingsTotal,
    //           reviews: reviewsData.reviews,
    //         },
    //         cachedAt: new Date(),
    //         updatedAt: new Date(),
    //       })
    //       .where(eq(widgets.id, widget.id));

    //     results.success++;
    //   } catch (error) {
    //     console.error(`Failed to refresh widget ${widget.id}:`, error);
    //     results.failed++;
    //   }
    // }

    // return NextResponse.json({
    //   message: "Review refresh completed",
    //   processed: widgetsToRefresh.length,
    //   ...results,
    // });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

async function fetchPlaceReviews(placeId: string) {
  const url = new URL(`${PLACES_API_BASE}/details/json`);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== "OK" || !data.result) {
    throw new Error(`Places API error: ${data.status}`);
  }

  const result = data.result;
  const reviews = (result.reviews || []).map((r: any) => ({
    id: `${placeId}_${r.author_name}_${r.time}`,
    authorName: r.author_name,
    authorPhoto: r.profile_photo_url,
    rating: r.rating,
    text: r.text,
    relativeTime: r.relative_time_description,
    time: r.time ? new Date(r.time * 1000).toISOString() : undefined,
  }));

  return {
    rating: result.rating,
    userRatingsTotal: result.user_ratings_total,
    reviews,
  };
}