function AverageMass(props) {
    let sum = 0
    let count = 0
    for (let meteor of props.data){
        const mass = meteor.properties?.mass

        if (mass !== undefined && mass != null){
            sum += mass
            count++
        }
    }
    let avg = count === 0 ? 0: Math.round(sum/count)

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Average Mass</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{avg.toString()}</td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }

export default AverageMass