import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'


Chart.register(...registerables)
Chart.register(CategoryScale)

Chart.defaults.font.family = 'Lato'


function AverageMass(props) {

    const calculateAvg = (list) => {
    let totalSum = 0
    let totalCount = 0
    for (let meteor of list){
        const mass = meteor.properties?.mass

        if (mass !== undefined && mass != null){
            totalSum += mass
            totalCount++
        }

    }

    let avg = totalCount === 0 ? 0: Math.round(totalSum/totalCount)
    return avg
  }
  let smallList = props.data.filter((meteor) => {
    const mass = meteor.properties.mass
    return mass!== undefined && mass != null && mass < 1000
  })

  let medList = props.data.filter((meteor) => {
    const mass = meteor.properties.mass
    return mass!== undefined && mass != null && (mass < 10000 && 1000 <= mass)
  })

  let largeList = props.data.filter((meteor) => {
    const mass = meteor.properties.mass
    return mass!== undefined && mass != null && (mass >= 10000)
  })  

  let smallAvg = calculateAvg(smallList)
  let medAvg = calculateAvg(medList)
  let largeAvg = calculateAvg(largeList)
  let totalAvg = calculateAvg(props.data)

  const data = {
    labels: ['Small', 'Medium', 'Large', 'Total'],
    datasets: [{
      label: 'Average Mass',
      data: [smallAvg, medAvg, largeAvg, totalAvg],
      borderWidth: 1
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
      <div>
        <h3 style={{textAlign:'center', backgroundColor:'blue', padding:'10px 0', color: 'white'}}>Average Mass</h3>
        <Bar options = {options} data={data} />
      </div>
    );
  }

export default AverageMass