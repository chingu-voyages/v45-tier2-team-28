import { useState, useEffect } from 'react'

import styles from './styles/Modal.module.css'



export default function Modal() {
  const [open, setOpen] = useState(false)
  const [meteorList, setMeteorList] = useState([])

  const fetchMeteorData = async () => {
    try {
        const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
        const data = await response.json()
        setMeteorList(data)
        console.log(data)
    } catch (error) {
        console.error("Error fetching data", error)
    }
  }

  useEffect(() => {
    fetchMeteorData()
  }, [])

  return ( open ?
    <div className={styles.modal}>
        <h2>Details</h2>
        <div className='table'>
            <table className='table-fixed'>
                <thead>
                    <tr>
                        <th className='table-title'>Name</th>
                        <th className='table-title'>Year of Strike</th>
                        <th className='table-title'>Meteorite Composition</th>
                        <th className='table-title'>Mass Range</th>
                    </tr>
                </thead>
                <tbody>
                    {meteorList.map((meteor) => {
                        return(
                    <tr>
                        <td>{meteor.name}</td>
                        <td>{new Date (meteor.year).getFullYear()}</td>
                        <td>{meteor.recclass}</td>
                        {meteor.mass ? 
                            <td>{Math.round(meteor.mass)}</td> : <td>Unknown</td>
                        }
                    </tr>)
                    })}

                </tbody>
            </table>
        </div>
    </div> : 
    <button onClick={() => setOpen(true)}>Show Details</button>
  )
} 