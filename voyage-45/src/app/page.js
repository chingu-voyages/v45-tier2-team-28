"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

// component imports
import MapBox from "@/components/Map";
import Navbar from "@/components/Navbar";
import StrikesMeteorChart from "@/components/StrikesMeteorChart";
import MeteorInfo from "@/components/MeteorInfo";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import TotalStrikes from "@/components/TotalNumberStrikes";
import AverageMass from "@/components/AverageMass";
import StrikesByComp from "@/components/StrikesByComp";

// utils
import { processDataByYear } from "@/utils/processMeteorData";


import fetchLocationData from "../app/helpers";


/* style imports */
import styles from "./page.module.css";
import { Truculenta } from "next/font/google";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterYear, setFilterYear] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterMass, setFilterMass] = useState({
    small: false,
    mid: false,
    large: false,
  });
  const [lowMass, setLowMass] = useState(0);
  const [highMass, setHighMass] = useState(1000000);
  const [searchIsShowing, setSearchIsShowing] = useState(false);

    const [searchLocations, setSearchLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [needsUpdated, setNeedsUpdated] = useState(true);
  const geoAPI = process.env.NEXT_PUBLIC_GEOAPI;

  // chart data
  const [chartDataByYear, setChartDataByYear] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json");
        const responseData = await req.json();
    
        const mapPoints = await Promise.all(responseData.map(async (item) => {
          const loc = await fetchLocationData(parseFloat(item.reclat), parseFloat(item.reclong), geoAPI);
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(item.reclong), parseFloat(item.reclat)],
            },
            properties: {
              title: item.name,
              type: item.recclass,
              year: item.year || "Unknown",
              mass: parseFloat(item.mass || 0),
              location: loc || "Unknown",
            },
          };
        }));
    
        setSearchLocations((prevSearchLocations) => [
          ...prevSearchLocations,
          ...mapPoints.map((item) => ({
            params: {
              lat: item?.geometry?.coordinates[1],
              lon: item?.geometry?.coordinates[0],
            },
          })),
        ]);
    
        setData(mapPoints);
        setFilteredData(mapPoints);
    
        const chartData = processDataByYear(mapPoints);
        setChartDataByYear(chartData);
    
        // Wait for all location data to be fetched
        await Promise.all(
          mapPoints.map(async (item) => {
            item.properties.location = (
              await item.properties.location
            ).features[0]?.properties?.formatted || "Unknown";
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    filterBar();
  };

  const filterBar = () => {
    if (filterYear === undefined) {
      setFilterYear("");
    }
    const stringYear = filterYear.toString();
    setFilteredData(
      data.filter((item) => {
        if (
          item.properties.title
            .toLowerCase()
            .includes(filterName.toLowerCase()) &&
          item.properties.year &&
          item.properties.year
            .toLowerCase()
            .includes(stringYear.toLowerCase()) &&
          item.properties.type
            .toLowerCase()
            .includes(filterClass.toLowerCase()) &&
          item.properties.mass >= lowMass &&
          item.properties.mass <= highMass &&
          item.properties.location.toLowerCase().includes(filterName.toLowerCase())
        ) {
          return item;
        }
      })
    );
  };

  const handleNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleTypeChange = (e) => {
    setFilterClass(e.target.value);
  };

  const handleMassChange = (e) => {
    const { name, checked, value } = e.target;
    const [start, end] = value.split("-").map(Number);
    setFilterMass({
      small: name === "small" ? checked : false,
      mid: name === "mid" ? checked : false,
      large: name === "large" ? checked : false,
    });
    setLowMass(start);
    setHighMass(end);
  };
  // setFilterMass({ ...filterMass, [e.target.name]: e.target.checked });

  const clear = (e) => {
    e.preventDefault();
    setFilteredData(data);
    setFilterYear("");
    setFilterClass("");
    setFilterName("");
    setFilterMass({
      small: false,
      mid: false,
      large: false,
    });
    setLowMass(0);
    setHighMass(1000000);
  };

  const toggleSearchBar = (e) => {
    e.preventDefault();
    setSearchIsShowing(!searchIsShowing);
    
  };


  return (
    <div className={styles.app}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
    <div className={styles.header}>
      <Navbar
        toggleSearchBar={toggleSearchBar}
        searchIsShowing={searchIsShowing}
        submit={handleSubmit}
        name={filterName}
        updateName={handleNameChange}
        updateYear={handleYearChange}
        updateType={handleTypeChange}
        updateSelected={handleMassChange}
        year={filterYear}
        mass={filterMass}
        type={filterClass}
        clear={clear}
      />
  <div className={styles.intro}>
      <div className={styles.introductionParagraph}>
        <h2>Welcome to Fireball!</h2>
        <p>Our goal is to shed light on the fascinating world
        of meteor strikes, offering a comprehensive view of data collected by
        NASA with over a 1000 strikes stretching back in time to the 1400s!
        Whether you're an astronomy enthusiast, a curious student, or simply
        intrigued by the mysteries of the universe, this platform provides an
        interactive experience to explore and learn about meteors, their dynamic
        sizes, impacts, and much more. Dive in and discover the cosmic wonders
        of our planet!</p>
        </div>
      </div>
      </div>

      <div className={styles.mainInfoContainer}>
        <Modal data={filteredData} search={searchLocations} />
        <MapBox data={filteredData} />
      </div>
      <MeteorInfo />
      <h2 className={styles.chartsTitle}>Summary Graphics</h2>
      <div className={styles.charts}>
        <TotalStrikes className= {styles.chart} data ={filteredData}/>  
        <AverageMass className= {styles.chart} data={filteredData} />
        <StrikesByComp className= {styles.chart} data={filteredData} />
        <StrikesMeteorChart className= {styles.chart} dataByYear={chartDataByYear} />
      </div>
      <Footer/>
    </div>
  );

}