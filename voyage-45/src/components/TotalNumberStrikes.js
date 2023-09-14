function TotalStrikes(props) {
  
    console.log("Total strikes", props.data.length)
        // if (mass !== undefined && mass != null){
        //     sum += mass
        //     count++
        // }

    // let avg = count === 0 ? 0: Math.round(sum/count)

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
                <td>{props.data.length}</td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }

export default TotalStrikes