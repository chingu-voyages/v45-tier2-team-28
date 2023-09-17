import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";
import { useState } from 'react';

Chart.register(...registerables);
Chart.register(CategoryScale);

/* styles */
import styles from './styles/StrikesMeteorChart.module.css';

function StrikesMeteorChart({ dataByYear }) {
  const NUM_YEARS_DISPLAYED = 20;
  const years = Object.keys(dataByYear).sort();

  const [isExpanded, setIsExpanded] = useState(false);

  const visibleYears = isExpanded ? years : years.slice(-NUM_YEARS_DISPLAYED);

  const chartData = {
    labels: visibleYears,
    datasets: [
      {
        label: 'Small',
        data: visibleYears.map(year => dataByYear[year].small),
        backgroundColor: '#BFACAA',
        borderColor: '#8E7C77',
        borderWidth: 1
      },
      {
        label: 'Medium',
        data: visibleYears.map(year => dataByYear[year].medium),
        backgroundColor: '#05204A',
        borderColor: '#041430',
        borderWidth: 1
      },
      {
        label: 'Large',
        data: visibleYears.map(year => dataByYear[year].large),
        backgroundColor: '#B497D6',
        borderColor: '#9C75C2',
        borderWidth: 1
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
        grid: {
          display: false
        },
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: 'Number of Strikes'
        },
        grid: {
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ": " + context.parsed.y;
          }
        }
      }
    }
  };

  return (
    <div className={isExpanded ? `${styles.chartContainer} ${styles.expanded}` : styles.chartContainer}>
      <h3 style={{textAlign:'center', backgroundColor:'blue', padding:'10px 0', color: 'white', marginBottom:'15px'}}>Average Mass</h3>
      <Bar data={chartData} options={options} responsive={true} maintainAspectRatio={false} />
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.toggleButton}
      >
        {isExpanded ? `Show Last ${NUM_YEARS_DISPLAYED} Years` : `Show All ${years.length} Years`}
      </button>
    </div>
  );
}

export default StrikesMeteorChart;
