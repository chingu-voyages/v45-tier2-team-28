import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.register(CategoryScale)

function TotalStrikes(props) {
  
  //console.log("Total strikes", props.data.length)

  const total = props.data.length
  console.log("Total strikes", total) 
  
  const smallNum = props.data.filter(num => {
    const small = num.properties.mass
    return small !== undefined && small != null && small < 1000
  }).length;

  const medNum = props.data.filter(num => {
    const med = num.properties.mass
    return med !== undefined && med != null && (med >= 1000 && med <= 9999)
  }).length;

  const largeNum = props.data.filter(num => {
    const large = num.properties.mass
    return large !== undefined && large != null && (large >= 10000 && large <= 100000000)
  }).length;

  const data = { 
    labels: ['Small', 'Medium', 'Large'],
    datasets: [{
      label: 'Total Strikes',
      data: [smallNum, medNum, largeNum],
      borderWidth: 1
    }]
  }

  
  return (
    <div>
      <Bar data={data} />
    </div>
    );
  }

export default TotalStrikes