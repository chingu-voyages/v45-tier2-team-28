import React, { useState, useEffect  } from "react";
import mapboxgl from "mapbox-gl";

// Styling
import styles from "./styles/Map.module.css";
import tooltipStyles from "./styles/Tooltip.module.css";

// Ensure Mapbox access token is set
mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_KEY;

function MapBox({ data }) {
  const [tooltip, setTooltip] = useState({
    display: false,
    content: "",
    x: 0,
    y: 0,
  });

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/navigation-night-v1",
            projection: "mercator",
            center: [-90, 25],
            zoom: 1, 
            cooperativeGestures: true,
        });

        map.setRenderWorldCopies(true);

        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl({showCompass:false, showZoom:true}));


    console.log("Map receieves: ");
    console.log(data);

    map.on("load", () => {
      // Add data to the map as a source
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data,
        },
      });

            // Layer and Paint configurations (same as previous)
            map.addLayer({
                id: "meteorites-point",
                type: "circle",
                source: "points",
                maxzoom: 6,
                minzoom: 1,
                paint: {
                    "circle-radius": [
                        "interpolate",
                        ["linear"],
                        ["get", "mass"],
                        10, 2,            // for mass = 10, radius = 2
                        100, 4,           // for mass = 100, radius = 4
                        500, 8,           // for mass = 500, radius = 8
                        1000, 12,         // for mass = 1000, radius = 12
                        10000, 20,        // for mass = 10000, radius = 20
                        100000, 28,       // for mass = 100000, radius = 28
                        500000, 36,       // for mass = 500000, radius = 36
                        1000000, 48,      // for mass = 1000000, radius = 48
                        2000000, 60,      // for mass = 2000000, radius = 60
                        4000000, 72,      // for mass = 4000000, radius = 72
                        10000000, 88,     // for mass = 10000000, radius = 88
                    ],
                    "circle-color": "#f04800",
                    "circle-stroke-color": "#ffc8b0",
                    "circle-stroke-width": 1,
                    "circle-stroke-opacity": 0.2,
                    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 1, 0, 5, 0.7],
                },
            });

            map.addLayer({
                id: "meteorites-heat",
                type: "heatmap",
                source: "points",
                maxzoom: 6,
                paint: {
                    "heatmap-weight": [
                        "interpolate",
                        ["linear"],
                        ["get", "mass"],
                        10,
                        0,
                        500000,
                        1,
                        3000000,
                        2,
                        10000000,
                        3,
                        20000000,
                        4,
                    ],
                    "heatmap-intensity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0,
                        0,
                        5,
                        2
                    ],
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0,
                        "rgba(255, 255, 255, 0)",
                        0.2,
                        "rgba(255, 200, 100, 0.3)",
                        0.4,
                        "rgba(255, 200, 100, 0.5)",
                        0.6,
                        "rgba(255, 150, 50, 0.6)",
                        0.8,
                        "rgba(255, 100, 25, 0.7)",
                        1,
                        "rgba(255, 50, 0, 0.8)"
                    ],
                    "heatmap-opacity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0,
                        0.3,
                        4,
                        0.6,
                        6,
                        0.9
                    ],
                },
            });
        });
        map.on('mousemove', 'meteorites-point', (e) => {
            if (e.features.length) {
                const feature = e.features[0];
                const coordinates = e.lngLat;
                const HTML = `
                    <strong>Name: ${feature.properties.title}</strong><br/>
                    Mass: ${feature.properties.mass} grams
                `;

        setTooltip({
          display: true,
          content: HTML,
          x: e.point.x,
          y: e.point.y,
        });
      }
    });

    // Add mouseleave event to hide tooltip
    map.on("mouseleave", "meteorites-point", () => {
      setTooltip({ display: false, content: "", x: 0, y: 0 });
    });

    map.touchZoomRotate.disable();

    return () => {
      map.remove();
    };
  }, [data]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" style={{ width: "100%", height: "100%" }} />

      {tooltip.display && (
        <div
          className={tooltipStyles.tooltip}
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
}
export default MapBox;
