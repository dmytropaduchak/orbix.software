import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

/**
 * GET /api/widget/[id]/data
 * Returns widget data including reviews
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Fetch widget
    const widget = await db.query.widgets.findFirst({
      where: (widgets, { eq }) => eq(widgets.publicId, id),
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    if (!widget.active) {
      return NextResponse.json({ error: "Widget is inactive" }, { status: 403 });
    }

    const cached = widget.cachedData || { reviews: [] };
    const filteredReviews = (cached.reviews || [])
      .filter((r) => (widget.minRating ? r.rating >= widget.minRating : true))
      .slice(0, widget.maxReviews);

    // Format response
    const response = {
      widget: {
        id: widget.publicId,
        layout: widget.layout,
        theme: widget.theme,
        primaryColor: widget.primaryColor,
        showDate: widget.showDate,
        showRating: widget.showRating,
        showAttribution: widget.showAttribution,
        customCss: widget.customCss,
      },
      place: {
        name: widget.placeName,
        rating: cached.rating ?? null,
        userRatingsTotal: cached.userRatingsTotal ?? null,
        googleMapsUrl: widget.placeMapsUrl,
      },
      reviews: filteredReviews,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching widget data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
