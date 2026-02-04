import { googlePlaces } from "../../../../db/schema";
import { db } from "../../../../db";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { fetchGooglePlaceData } from "../../../../google/google";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const currentTime = Date.now();
  try {
    const rows = await db
      .select()
      .from(googlePlaces);
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowData = row.data as any

      const data = await fetchGooglePlaceData(rowData.id);

      const reviews = data.reviews.reduce((acc: any[], i: any) => {;
        if (acc.find((r) => r.name === i.name)) {
          acc.push(i);
        }
        return acc;
      }, rowData.reviews);
      
      await db
        .update(googlePlaces)
        .set({ data: { ...data, reviews } })
        .where(eq(googlePlaces.id, row.id));
    }
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    const time = Date.now() - currentTime;
    const message = (err as Error).message;
    console.log(`[ERROR][API][GET][cron][refresh] ${time}ms.`, message);
    return new NextResponse('Bad Request', { status: 400 });
  }
}
