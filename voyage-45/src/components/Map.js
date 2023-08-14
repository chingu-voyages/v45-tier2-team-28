import React, { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

/* styles */
import styles from "./styles/Map.module.css"

// mapbox api_key held in .env file
mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_KEY;

function MapBox() {
    const [map, setMap] = useState(null);

    useEffect(() => { 
        if (!map) {
            // Instantiate map instance
            const newMapInstance = new mapboxgl.Map({
                container: "map", 
                style: "mapbox://styles/mapbox/satellite-streets-v11",
                projection: "mercator",
                center: [60, 25],
                zoom: 1,
                cooperativeGestures: true,
            });

            setMap(newMapInstance);
        }

        return () => {
            if (map) map.remove();
        };
    }, [map]);

    return (
        <div className={styles.mapContainer}>
            <div id="map" style={{ width: '100%', height: '100%' }} />
        </div>

    );
}

export default MapBox;
