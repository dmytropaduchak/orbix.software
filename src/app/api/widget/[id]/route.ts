import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

/**
 * GET /api/widget/[id]
 * Returns widget configuration
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const widget = await db.query.widgets.findFirst({
      where: (widgets, { eq }) => eq(widgets.publicId, id),
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    if (!widget.active) {
      return NextResponse.json({ error: "Widget is inactive" }, { status: 403 });
    }

    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error fetching widget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
