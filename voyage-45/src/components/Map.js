import React, { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';

// mapbox api_key held in .env file
mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_KEY;

function MapBox() {
    const [map, setMap] = useState(null);

    useEffect(() => { 
        if (!map) {
            // Instantiate map instance
            const newMapInstance = new mapboxgl.Map({
                container: "map", 
                style: "mapbox://styles/mapbox/dark-v11",
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

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
}

export default MapBox;
