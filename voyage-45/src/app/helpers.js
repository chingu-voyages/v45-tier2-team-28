async function fetchLocationData(lat, lon, geoAPI) {
  try {
    const req = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${geoAPI}`
    );
    const responseData = await req.json();
    return responseData.results[0].country || responseData.results[0].ocean || "Unknown";
  }catch(error) {
    console.error("Error fetching data:", error);
  }
}
 export default fetchLocationData;