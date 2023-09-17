# Fireball - Meteor Strike Visualization
Fireball is a web application built to visualize meteor strikes over years and years with an interactive map and data-driven charts. This app was built by Chingu Voyage Group 28 during Voyage 45 (September 2023).
The group is comprised of: Shannan Bunch (https://github.com/funbunch), Mason Sams (https://github.com/LongDefeat), Lesley Tomosada (https://github.com/lesleytomosada), and Denise Zitting (https://github.com/dzitting)

<img width="1830" alt="Screen Shot 2023-09-17 at 10 18 39 AM" src="https://github.com/chingu-voyages/v45-tier2-team-28/assets/78603508/6984df72-5c41-4953-838f-71526a8864c9">

<img width="1680" alt="Screen Shot 2023-09-17 at 10 17 46 AM" src="https://github.com/chingu-voyages/v45-tier2-team-28/assets/78603508/3c7779ef-c8f6-4118-a25d-c44ed0b6753f">

<img width="1828" alt="Screen Shot 2023-09-17 at 10 18 14 AM" src="https://github.com/chingu-voyages/v45-tier2-team-28/assets/78603508/ba4c8902-f0ef-4d08-97d9-dff88f18abd2">

## Table of Contents
- [Live Code](#live-code)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Live Code
https://fireball-map.netlify.app/

## Features
- Visualize meteor strikes by year and/or size.
- Filter data to view stats for all recorded data.
- Responsive charts with interactive tooltips including a map to visualize meteor strike landings.

## Installation and Setup
1. Clone this repository.
2. Navigate to the project directory.
3. Install depedencies using "npm install" in your terminal.
4. Start the development server.

## Usage

1. Open the application in your web browser.
2. Zoom in and out over the map for tool tip details on each meteor strike.
3. Click "Show Details" to display a data table for each meteor strike.
4. Click search button in navigation to filter through various results.
5. Scroll to button for summary graphics with data for Total Number of Strikes, Average Mass of Meteors, Strikes by Composition, and Strikes per Year. 
6. Use the "Show All" button to toggle between displaying data for all years or just the last 20 years on Strikes per Year graph.
7. Hover over bars in the chart to see detailed information about meteor strikes for each year.


## Acknowledgements

- Data source: Nasa API - https://data.nasa.gov/Earth-Science/Meteorite-Landings-API/c2vx-j9ed
- Chart library: [react-chartjs-2](https://react-chartjs-2.js.org/)
- Map Library: [map-boxgl] (https://docs.mapbox.com/mapbox-gl-js/api/map/)
