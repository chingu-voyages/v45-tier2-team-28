import React, { useEffect, useRef } from 'react'; // Import useRef for the canvas element
import Chart from 'chart.js/auto';

function StrikesByComp(props) {
  // Use useRef to get a reference to the canvas element
  const chartRef = useRef();

  useEffect(() => {
    // Extract unique types using Set for the pie labels
    const labels = [...new Set(props.data.map((item) => item.properties.type))];

    // Calculate the count for each type
    const typeCounts = labels.map((type) => {
      const count = props.data.filter((item) => item.properties.type === type).length;
      return { name: type, count: count };
    });

    // Generate an array of colors with varying red values
    const backgroundColors = labels.map((_, index) => `rgba(${255 - index * 5}, 56, 0, 0.5)`);

    const data = {
      labels: labels, // Use "labels" for the label property
      datasets: [
        {
          label: 'Strikes by Composition',
          data: typeCounts.map((item) => item.count),
          backgroundColor: backgroundColors,
          borderColor: '#8E7C77',
          borderWidth: 3,
          pointStyle: 'rect',
          hoverOffset: 15,
        },
      ],
    };

    // Check if the chartRef is available before creating the chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
          animations: {
            animateRotate: true, // Add rotation animation
            animateScale: true, // Add scaling animation
            duration: 2000,
            easing: 'easeOutBack'
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        // Destroy the Chart.js instance when the component unmounts or data alters
        chart.destroy();
      };
    }
  }, [props.data]); // Run this effect whenever props.data changes

  return (
    <div>
      {/* Use the chartRef for the canvas element */}
      <canvas id="strikeChart" ref={chartRef} style={{ maxWidth: 550, maxHeight: 550 }}></canvas>
    </div>
  );
}

export default StrikesByComp;
