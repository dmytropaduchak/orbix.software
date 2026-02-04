export const fetchGooglePlaceID = async (textQuery: string) => {
  const url = new URL(`${process.env.GOOGLE_PLACES_API_URL}:searchText`);
  const data = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery }),
  });
  const dataJson = await data.json();
  return dataJson?.places?.[0]?.id;
}
  
export const fetchGooglePlaceData = async (placeID: string): Promise<any> => {
  const url = new URL(`${process.env.GOOGLE_PLACES_API_URL}/${placeID}`);

  const data = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,location,primaryType,types,rating,userRatingCount,reviews,googleMapsUri,websiteUri,internationalPhoneNumber",
    },
  });
  return data.json();
}