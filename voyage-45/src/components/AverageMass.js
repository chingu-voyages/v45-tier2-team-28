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

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Average Mass</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                <td>Small</td>
                <td>{smallAvg.toString()}</td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>{medAvg.toString()}</td>
              </tr>
              <tr>
                <td>Large</td>
                <td>{largeAvg.toString()}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{totalAvg.toString()}</td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }

export default AverageMass