"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

// component imports
import MapBox from "@/components/Map";
import Navbar from "@/components/Navbar";
import StrikesMeteorChart from "@/components/StrikesMeteorChart";

// utils 
import { processDataByYear } from "@/utils/processMeteorData";
import AverageMass from "@/components/AverageMass";


/* style imports */
import styles from "./page.module.css";

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
            year: item.year,
            mass: parseFloat(item.mass || 0),
          },
        }));

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
          item.properties.year.toLowerCase().includes(stringYear.toLowerCase()) &&
          item.properties.type.toLowerCase().includes(filterClass.toLowerCase()) &&
          item.properties.mass >= lowMass &&
          item.properties.mass <= highMass
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
  }

  const handleMassChange = (e) => {
    const { name, checked, value } = e.target;
    const [start, end] = value.split("-").map(Number);
    setFilterMass({
      small: name === 'small' ? checked : false,
      mid: name === 'mid' ? checked : false,
      large: name === 'large' ? checked : false
    });
    setLowMass(start);
    setHighMass(end);
    }
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
      large: false
    })
    setLowMass(0);
    setHighMass(1000000);
  }

  const toggleSearchBar = (e) => {
    e.preventDefault();
    setSearchIsShowing(!searchIsShowing);
  }

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

      <MapBox data={filteredData} />

      <StrikesMeteorChart dataByYear={chartDataByYear} />
      <AverageMass data = {filteredData}/>
    </>
  );
}
