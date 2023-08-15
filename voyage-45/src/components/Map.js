import React, { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

/* styles */
import styles from "./styles/Map.module.css";

// mapbox api_key held in .env file
mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_KEY;

function MapBox() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!map) {
            const newMapInstance = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/navigation-night-v1",
                projection: "mercator",
                center: [60, 25],
                zoom: 1,
                cooperativeGestures: true,
            });

            newMapInstance.on('load', async () => {
                try {
                    // request to meteor API
                    const req = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
                    const data = await req.json();

                    // create GeoJSONobj for each map point
                    const mapPoints = data.map(item => createGeoJSONObj(item));
                    
                    newMapInstance.addSource("points", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: mapPoints,
                        },
                    });

                    newMapInstance.addLayer({
                        id: "meteorites-point",
                        type: "circle",
                        source: "points",
                        minzoom: 3,
                        paint: {
                            "circle-radius": [
                                "interpolate",
                                ["linear"],
                                ["get", "mass"],
                                10, 1,
                                100, 2,
                                500, 3,
                                1000, 5,
                                10000, 8,
                                100000, 15,
                                500000, 25,
                                1000000, 50,
                                2000000, 80,
                                4000000, 100,
                                10000000, 150,
                            ],
                            "circle-color": "#f04800",
                            "circle-stroke-color": "#ffc8b0",
                            "circle-stroke-width": 1,
                            "circle-stroke-opacity": 0.6,
                            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 3, 0, 4, 0.9],
                        },
                    });

                    newMapInstance.addLayer({
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
                                0.3,
                                3000000,
                                0.5,
                                10000000,
                                0.8,
                                20000000,
                                1,
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
                                "rgba(255, 250, 200, 0.5)",
                                0.4,
                                "rgba(255, 200, 100, 0.7)",
                                0.6,
                                "rgba(255, 150, 50, 0.8)",
                                0.8,
                                "rgba(255, 100, 25, 0.9)",
                                1,
                                "rgba(255, 50, 0, 1)"
                            ],
                            "heatmap-opacity": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0,
                                0.3,
                                4,
                                0.7,
                                6,
                                1
                            ],
                        },
                      });
                } catch (error) {
                    console.error("Error fetching or processing data:", error);
                }
            });

            setMap(newMapInstance);
        }

        return () => {
            if (map) map.remove();
        };
    }, [map]);

    function createGeoJSONObj(data) {
        return {
            type: "feature",
            geometry: {
                type: "Point",
                coordinates: [data.reclong, data.reclat],
            },
            properties: {
                title: data.name,
                type: data.recclass,
                year: data.year,
                mass: data.mass,
            },
        };
    }

    return (
        <div className={styles.mapContainer}>
            <div id="map" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default MapBox;
