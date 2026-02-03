import { NextRequest, NextResponse } from "next/server";
// import { randomUUID } from "crypto";
// import { db } from "@/db";
// import { widgets } from "@/db/schema";

/**
 * POST /api/widget/create
 * Creates a new widget
 * Body: { userId, placeId, placeName?, placeAddress?, placeMapsUrl?, name, layout?, theme? }
 */
export async function POST(req: NextRequest) {
  try {
    console.log(req);
    // const body = await req.json();
    // const {
    //   userId,
    //   placeId,
    //   placeName,
    //   placeAddress,
    //   placeMapsUrl,
    //   name,
    //   layout = "grid",
    //   theme = "light",
    //   primaryColor = "#1976d2",
    //   maxReviews = 10,
    //   minRating = 1,
    //   showDate = true,
    //   showRating = true,
    //   showAttribution = true,
    //   customCss,
    // } = body;

    // if (!userId || !placeId || !name) {
    //   return NextResponse.json(
    //     { error: "userId, placeId, and name are required" },
    //     { status: 400 }
    //   );
    // }

    // // Generate unique public ID
    // const publicId = randomUUID();

    // // Create widget
    // const [widget] = await db
    //   .insert(widgets)
    //   .values({
    //     userId,
    //     placeId,
    //     placeName,
    //     placeAddress,
    //     placeMapsUrl,
    //     name,
    //     publicId,
    //     layout,
    //     theme,
    //     primaryColor,
    //     maxReviews,
    //     minRating,
    //     showDate,
    //     showRating,
    //     showAttribution,
    //     customCss,
    //     active: true,
    //   })
    //   .returning();

    // return NextResponse.json(widget, { status: 201 });
  } catch (error) {
    console.error("Error creating widget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
