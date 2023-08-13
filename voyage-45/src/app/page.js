import Image from 'next/image';
import styles from './page.module.css';


export default function Home() {

  mapboxgl.accesstoken = process.env.API_KEY

  const map = new mapboxgl.Map({
    container: "map", // Container ID
    style: "mapbox://styles/mapbox/dark-v11", 
    projection: "mercator", 
    center: [60, 25], 
    zoom: 1,
    cooperativeGestures: true, 
  });

  return (
    <>
      <body>
        <h1>Home Page</h1>

        <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
      </body>
    </>
  )
}
