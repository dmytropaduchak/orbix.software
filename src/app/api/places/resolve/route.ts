import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/place/resolve
 * Resolves a Google Place from URL, CID, or PlaceId
 * Body: { input: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json(
        { error: "input is required" },
        { status: 400 }
      );
    }

    // Resolve the Place ID from various input formats
    const placeData = await resolvePlaceId(input);

    if (!placeData.placeId) {
      return NextResponse.json(
        { error: "Could not resolve Place ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(placeData, { status: 200 });
  } catch (error) {
    console.error("Error resolving place:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

async function resolvePlaceId(input: string) {
  let placeId: string | null = null;

  if (input.startsWith("ChIJ")) {
    placeId = input;
  } else if (/cid[=\/](\d+)/.test(input)) {
    const cidMatch = input.match(/cid[=\/](\d+)/);
    if (cidMatch) {
      placeId = await cidToPlaceId(cidMatch[1]);
    }
  } else if (
    input.includes("maps.google.com") ||
    input.includes("goo.gl/maps") ||
    input.includes("maps.app.goo.gl")
  ) {
    const cidMatch = input.match(/cid[=\/](\d+)/);
    if (cidMatch) {
      placeId = await cidToPlaceId(cidMatch[1]);
    } else {
      const placeMatch = input.match(/place\/(.*?)\//);
      if (placeMatch) {
        placeId = await searchPlaceByName(placeMatch[1]);
      }
    }
  } else {
    placeId = await searchPlaceByName(input);
  }

  if (!placeId) {
    throw new Error("Could not resolve Place ID from input");
  }

  return await fetchPlaceDetails(placeId);
}

async function cidToPlaceId(cid: string): Promise<string | null> {
  const url = new URL(`${PLACES_API_BASE}/findplacefromtext/json`);
  url.searchParams.set("input", `google maps cid ${cid}`);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status === "OK" && data.candidates?.[0]?.place_id) {
    return data.candidates[0].place_id;
  }

  return null;
}

async function searchPlaceByName(query: string): Promise<string | null> {
  const url = new URL(`${PLACES_API_BASE}/findplacefromtext/json`);
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status === "OK" && data.candidates?.[0]?.place_id) {
    return data.candidates[0].place_id;
  }

  return null;
}

async function fetchPlaceDetails(placeId: string) {
  const url = new URL(`${PLACES_API_BASE}/details/json`);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "place_id,name,formatted_address,rating,user_ratings_total,url"
  );
  url.searchParams.set("key", GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== "OK" || !data.result) {
    throw new Error(`Places API error: ${data.status}`);
  }

  const result = data.result;

  return {
    placeId,
    name: result.name,
    address: result.formatted_address,
    rating: result.rating,
    userRatingsTotal: result.user_ratings_total,
    googleMapsUrl: result.url,
  };
}
