import { fetchGooglePlaceData, fetchGooglePlaceID } from "../../../../google/google";
import { db } from "../../../../db";
import { googlePlaces } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

class GooglePlace {
  constructor(
    private readonly str: string
  ) {}

  async find() {
    const uuid = this.parseUuid() || await this.fetchUuid();
    return this.fetchData(uuid!);
  }

  private parseUuid() {
    if (this.str.startsWith("ChIJ")) {
      return this.str;
    }
    if (/[?&]placeid=([A-Za-z0-9_-]+)/.test(this.str)) {
      const url = new URL(this.str);
      return url.searchParams.get("placeid");
    }
  }

  private async fetchUuid() {
    if (/cid[=\/](\d+)/.test(this.str)) {
      const cid = this.str.match(/cid[=\/](\d+)/);
      return fetchGooglePlaceID(`google maps cid ${cid?.[1]}`);
    }
    if (/place\/(.*?)\//.test(this.str)) {
      const place = this.str.match(/place\/(.*?)\//);
      return fetchGooglePlaceID(place?.[1]!);
    }
    return fetchGooglePlaceID(this.str);
  }

  private async fetchData(uuid: string) {
    const rows = await db
      .select()
      .from(googlePlaces)
      .where(eq(googlePlaces.uuid, uuid!));
    if (rows.length) {
      return rows[0].data;
    } else {
      const data = await fetchGooglePlaceData(uuid!);
      await db
        .insert(googlePlaces)
        .values({ uuid, data });
      return data;
    }
  }
}


export async function GET(nextRequest: NextRequest) {
  const currentTime = Date.now();
  try {
    const url = nextRequest?.nextUrl?.searchParams.get('url')

    const googlePlace = new GooglePlace(url!);
    const googlePlaceData = await googlePlace.find();

    return new NextResponse(JSON.stringify(googlePlaceData), { status: 200 });
  } catch (err) {
    const time = Date.now() - currentTime;
    const message = (err as Error).message;
    console.log(`[ERROR][API][GET][places] ${time}ms.`, message);
    return new NextResponse('Bad Request', { status: 400 });
  }
}
