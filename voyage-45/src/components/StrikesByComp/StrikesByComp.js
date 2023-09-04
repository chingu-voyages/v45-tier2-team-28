import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import the Chart object properly

function StrikesByComp(props) {
  // Initialize the dataSet state
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    // Extract unique types using Set for the pie labels
    const labels = [...new Set(props.data.map(item => item.properties.type))];

    // Calculate the count for each type
    const typeCounts = labels.map(type => {
      const count = props.data.filter(item => item.properties.type === type).length;
      return { name: type, count: count };
    });

    // Update the dataSet state with the calculated counts
    setDataSet(typeCounts);

    const ctx = document.getElementById('strikeChart');

    // Generate an array of colors with varying red values
    const backgroundColors = labels.map((_, index) => `rgb(${255 - (index * 5)}, 56, 0)`);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Strikes by Composition',
          data: typeCounts.map(item => item.count), // Use typeCounts for data
          backgroundColor: backgroundColors, // Use the generated colors
          hoverOffset: 15,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });

    return () => {
      // Destroy the Chart.js instance when the component unmounts or data alters
      chart.destroy();
    };
  }, [props.data]); // Run this effect whenever props.data changes

  return (
    <div>
      <canvas id="strikeChart" style={{ maxWidth: 550, maxHeight: 550 }}></canvas>
    </div>
  );
}

export default StrikesByComp;
