import { useState, useEffect } from 'react'

import styles from './styles/Modal.module.css'


export default function Modal(props) {
  const [open, setOpen] = useState(true)
  const [meteorList, setMeteorList] = useState([])


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
                        <td>{meteor?.properties?.title}</td>
                        <td>{meteor?.properties?.year ? new Date (meteor.properties.year).getFullYear(): ""}</td>
                        <td>{meteor?.properties?.type}</td>
                        {meteor?.properties?.mass ? 
                            (<td>{Math.round(meteor?.properties?.mass)}</td>) : (<td>Unknown</td>)
                        }
                        <td>{meteor?.properties?.location}</td>
                    </tr>)
                    })}

                </tbody>
            </table>
        </div>
    </div> : 
    <button onClick={() => setOpen(true)}>Show Details</button>
  )
} 