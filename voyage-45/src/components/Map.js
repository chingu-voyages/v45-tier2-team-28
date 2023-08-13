
// FUnction to create GeoJSON obnj from fetched data
function createGeoJSONObj(data) {
    let obj = {
      type: "feature",
      geometry: {
        type: "Point",
        // GeoJSON is longitude first
        coordinates: [data.reclong, data.reclat],
      },
      // Properties can be any type and value
      properties: {
        title: data.name, // Name of the meteorite fall location
        type: data.recclass, // Meteorite classification
        year: data.year, // Year observed
        // Since the incoming meteorite mass value is a string, convert
        // it to a number with parseInt() — this is important because
        // I want to use meteorite mass as a major focus of the map styles
        mass: convertToNum(data.mass),
      },
    };
    return obj;
  }