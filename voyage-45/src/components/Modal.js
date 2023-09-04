import { useState, useEffect } from 'react'
import fetchLocationData from '../app/helpers'

import styles from './styles/Modal.module.css'


export default function Modal(props) {
  const [open, setOpen] = useState(true)
  const [meteorList, setMeteorList] = useState([])
  const geoAPI = process.env.NEXT_PUBLIC_GEOAPI;

  const fetchMeteorData = async (props) => {
    try {
        const locationPromises = props.data.map(async(meteor) => {
            if (meteor.geolocation?.latitude && meteor.geolocation?.longitude){

                return {
                    ...meteor,
                    location: await fetchLocationData(meteor.geolocation.latitude, meteor.geolocation.longitude),
                    
                }
            } else {
                return meteor
            }
        })

        const settledPromises = await Promise.allSettled(locationPromises)

        const meteorDataWithLocation = settledPromises.filter((result) => result.status === 'fulfilled').map((result)=> result.value)

        setMeteorList(meteorDataWithLocation)

    } catch (error) {
        console.error("Error fetching data", error)
    }
  }


  useEffect(() => {
    fetchMeteorData()
  }, [])

  const fetchLocationData = async (latitude, longitude) => {
    try{
        // const baseUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=1094f81ea7b641efa1e00856cdc701bc`
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
                    {props.data.map((meteor, index) => {
                        return(
                    <tr key={index}>
                        <td>{meteor.properties.title}</td>
                        <td>{meteor.properties.year ? new Date (meteor.properties.year).getFullYear(): ""}</td>
                        <td>{meteor.properties.type}</td>
                        {meteor.properties.mass ? 
                            (<td>{Math.round(meteor.properties.mass)}</td>) : (<td>Unknown</td>)
                        }
                        <td>{meteor.properties.location}</td>
                    </tr>)
                    })}

                </tbody>
            </table>
        </div>
    </div> : 
    <button onClick={() => setOpen(true)}>Show Details</button>
  )
} 