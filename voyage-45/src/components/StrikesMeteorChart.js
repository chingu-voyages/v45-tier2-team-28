import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(CategoryScale);

/* styles */
import styles from './styles/StrikesMeteorChart.module.css';


function StrikesMeteorChart({ dataByYear }) {
  const years = Object.keys(dataByYear).sort();
  const smallData = years.map(year => dataByYear[year].small);
  const mediumData = years.map(year => dataByYear[year].medium);
  const largeData = years.map(year => dataByYear[year].large);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Small',
        data: smallData,
        backgroundColor: '#BFACAA',
        borderColor: '#8E7C77',
        borderWidth: 1
      },
      {
        label: 'Medium',
        data: mediumData,
        backgroundColor: '#05204A',
        borderColor: '#041430',
        borderWidth: 1
      },
      {
        label: 'Large',
        data: largeData,
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
        }
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
      title: {
        display: true,
        text: 'Meteor Strikes per Year',
        font: {
          size: 20
        },
        padding: 10
      },
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
    <div className={styles.chartContainer}>
      <Bar data={chartData} options={options} responsive={true} maintainAspectRatio={false} />
    </div>
  );
}

export default StrikesMeteorChart;
