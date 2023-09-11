"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

// component imports
import MapBox from "@/components/Map";
import Navbar from "@/components/Navbar";
import StrikesMeteorChart from "@/components/StrikesMeteorChart";
import MeteorInfo from "@/components/MeteorInfo";

// utils
import { processDataByYear } from "@/utils/processMeteorData";
import AverageMass from "@/components/AverageMass";
import Modal from "@/components/Modal";
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
    const fetchData = async () => {
      try {
        const req = await fetch(
          "https://data.nasa.gov/resource/gh4g-9sfh.json"
        );
        const responseData = await req.json();

        const mapPoints = responseData.map((item) => ({
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
            location: "Unknown",
          },
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateLocations = async () => {
      if (needsUpdated && searchLocations.length > 0) {
        const returned = await fetchLocationData(searchLocations, geoAPI);
        console.log(returned);
        setLocations(returned);
        setNeedsUpdated(false);
      }
    };
    updateLocations();
  }, [data]);

  useEffect(() => {
    console.log("Called to check locations");
    if (locations !== []) {
      setData((prevData) => {
        return prevData.map((prev, index) => {
          // Check if the index is within the bounds of the 'locations' array
          const locationInfo = locations.results[index];
          try {
            if (locationInfo.result.features[0].properties.country) {
          console.log(locationInfo.result.features[0].properties.country);
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: locationInfo.result.features[0].properties.country,
                }
              };
              //If no location return unknown -test
            }if(locationInfo.result.features[0].properties.ocean){ 
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: locationInfo.result.features[0].properties.ocean,
                }
              };
            }else {
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: "Unknown",
                }
              };
            }
          } catch (error) {
            console.log(error);
            return {
              ...prev,
                properties: {
                ...prev.properties,
                  location: "Unknown",
                }
            };
          }
        });
      });
      setFilteredData((prevData) => {
        return prevData.map((prev, index) => {
          // Check if the index is within the bounds of the 'locations' array
          const locationInfo = locations.results[index];
          try {
            if (locationInfo.result.features[0].properties.country) {
          console.log(locationInfo.result.features[0].properties.country);
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: locationInfo.result.features[0].properties.country,
                }
              };
              //If no location return unknown -test
            }if(locationInfo.result.features[0].properties.ocean){ 
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: locationInfo.result.features[0].properties.ocean,
                }
              };
            }else {
              return {
                ...prev,
                properties: {
                  ...prev.properties,
                  location: "Unknown",
                }
              };
            }
          } catch (error) {
            console.log(error);
            return {
              ...prev,
                properties: {
                ...prev.properties,
                  location: "Unknown",
                }
            };
          }
        });
      });
    }
  }, [locations]);



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

  console.log(filteredData.length);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

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

      <p className={styles.introductionParagraph}>
        Welcome to Fireball! Our goal is to shed light on the fascinating world
        of meteor strikes, offering a comprehensive view of data collected by
        NASA with over a 1000 strikes stretching back in time to the 1400s!
        Whether you're an astronomy enthusiast, a curious student, or simply
        intrigued by the mysteries of the universe, this platform provides an
        interactive experience to explore and learn about meteors, their dynamic
        sizes, impacts, and much more. Dive in and discover the cosmic wonders
        of our planet!
      </p>

      <MapBox data={filteredData} />
      <MeteorInfo />
      <StrikesMeteorChart dataByYear={chartDataByYear} />
      <AverageMass data={filteredData} />
      <Modal data={filteredData} search={searchLocations} />
    </>
  );
}
