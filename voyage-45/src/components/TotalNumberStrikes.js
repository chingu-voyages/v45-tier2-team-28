import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.register(CategoryScale)

function TotalStrikes(props) {
  
  const total = props.data.length

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
    labels: ['Small', 'Medium', 'Large', 'Total'],
    datasets: [{
      label: 'Total Strikes',
      data: [smallNum, medNum, largeNum ,total],
      borderWidth: 1,
      backgroundColor: '#43A5B0',
      borderColor: '#43A5B0',
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      }
    }
  }
  
  return (
    <div className='totalstrikes--chart'>
      <h3 style={{textAlign:'center', backgroundColor:'#F3EA98', padding:'10px 0', color: 'black'}}>Total Strikes</h3>
      <Bar data={data} options={options} style ={{backgroundColor:'rgb(247, 249, 252)'}}/>
    </div>
    );
  }

export default TotalStrikes
