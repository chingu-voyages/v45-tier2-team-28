import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.register(CategoryScale)

function TotalStrikes(props) {
  
  //console.log("Total strikes", props.data.length)

  const total = props.data.length
  console.log("Total strikes", total) 
  
  const small = props.data.filter(num => {
    return num != undefined && num != null && (num < 1000)
    console.log("Small", small)
  })
  console.log("Small", small.length)
  const med = props.data.filter(num => {
    return num != undefined && num != null && (num >= 1000 && num <= 9999)
  })

  const large = props.data.filter(num => {
    return num != undefined && num != null && (num >= 10000 && num <= 100000000)
  })

  const data = { 
    labels: ['Sma', 'Medium', 'Large'],
  }

  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Total Strikes</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <Bar data={data} />
            </tr>
        </tbody>
      </table>
    </div>
    );
  }

export default TotalStrikes