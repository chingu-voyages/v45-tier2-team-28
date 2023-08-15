'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import FilterBar from '../components/FilterBar';


// component imports 
import MapBox from '@/components/Map';
import Navbar from '@/components/Navbar';

/* style imports */
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
        const responseData = await req.json();
        
        const mapPoints = responseData.map(item => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [parseFloat(item.reclong), parseFloat(item.reclat)],
          },
          properties: {
            title: item.name,
            type: item.recclass,
            year: item.year,
            mass: parseFloat(item.mass || 0),
          }, 
        }));

        setData(mapPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
<<<<<<< HEAD

      </Head>
      
      <Navbar />
      <h1>Home Page</h1>
=======
        {/* <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script> */}
      </Head>
      
      <FilterBar />
>>>>>>> 824e68c (Created FilterBar component, and imported into the main app page.js)

      <MapBox data={data} />
    </>
  );
}
