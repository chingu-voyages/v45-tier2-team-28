import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.register(CategoryScale)



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
    return mass!== undefined && mass != null && mass < 10
  })

  let medList = props.data.filter((meteor) => {
    const mass = meteor.properties.mass
    return mass!== undefined && mass != null && (mass < 2000 && 11 <= mass)
  })

  let largeList = props.data.filter((meteor) => {
    const mass = meteor.properties.mass
    return mass!== undefined && mass != null && (mass > 2000)
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
      title: {
        display: true,
        text: 'Average Mass'
      }
    }
  }

    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  }

export default AverageMass