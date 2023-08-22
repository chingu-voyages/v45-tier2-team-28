import { useState, useEffect } from 'react'

import styles from './styles/Modal.module.css'




export default function Modal() {
  const [open, setOpen] = useState(true)
  const [meteorList, setMeteorList] = useState([])

  const fetchMeteorData = async () => {
    try {
        const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
        const data = await response.json()

        for (const meteor of data) {
            if (!(meteor.location)){
            const location = await fetchLocationData(meteor.geolocation?.latitude, meteor.geolocation?.longitude)
            meteor.location = location
            console.log(meteor.location)
            }
        }

        setMeteorList(data)

    } catch (error) {
        console.error("Error fetching data", error)
    }
  }

  useEffect(() => {
    fetchMeteorData()
  }, [])

  const fetchLocationData = async (latitude, longitude) => {
    try{
        const baseUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=0cb197c667d74a29b3a4b26437f8d747`
        const response = await fetch(baseUrl)
        const data = await response.json()
        const location = data.features[0].properties.country
        return location
    } catch (error) {
        console.error("Error fetching location data", error)
    }
  }

  return ( open ?
    <div className={styles.modal}>
        <button onClick={() => setOpen(false)}>X</button>
        <h2>Details</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year of Strike</th>
                        <th>Meteorite Composition</th>
                        <th>Mass Range</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {meteorList.map((meteor) => {
                        return(
                    <tr key={meteor.id}>
                        <td>{meteor.name}</td>
                        <td>{meteor.year ? new Date (meteor.year).getFullYear(): ""}</td>
                        <td>{meteor.recclass}</td>
                        {meteor.mass ? 
                            (<td>{Math.round(meteor.mass)}</td>) : (<td>Unknown</td>)
                        }
                        <td>{meteor.location}</td>
                    </tr>)
                    })}

                </tbody>
            </table>
        </div>
    </div> : 
    <button onClick={() => setOpen(true)}>Show Details</button>
  )
} 