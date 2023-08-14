'use client';
import React, { Suspense } from 'react';
import Head from 'next/head';

// component imports 
import MapBox from '@/components/Map';

/* style imports */
import styles from './page.module.css';

export default function Home() {
 

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
      </Head>
      
      <h1>Home Page</h1>

      <Suspense fallback={<div>Loading map...</div>}>
        <MapBox />
      </Suspense>
    </>
  )
}
