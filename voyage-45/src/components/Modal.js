import { useState, useEffect } from 'react'

import styles from './styles/Modal.module.css'


export default function Modal(props) {
  const [open, setOpen] = useState(true)

  return ( 
    open ?
    <div className={styles.modal}>
        <div className={styles.header}>
 
            <button className={styles.button} onClick={() => setOpen(false)}>X</button>
            <h3 className={styles.tableTitle}>Meteor Details</h3>
        </div>

        <div>
            <table className={styles.detailTable}>
                <thead className={styles.tableHead}> 
                    <tr className={styles.tableHeadRow}>
                        <th className={styles.tableHeadData}>Name</th>
                        <th className={styles.tableHeadData}>Year</th>
                        <th className={styles.tableHeadData}>Composition</th>
                        <th className={styles.tableHeadData}>Mass (g)</th>
                        <th className={styles.tableHeadDataEnd}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((meteor, index) => {
                        return(
                    <tr key={index}>
                        <td className={styles.tableRowData}>{meteor?.properties?.title}</td>
                        <td className={styles.tableRowData}>{meteor?.properties?.year && meteor?.properties?.year !== "Unknown" ? new Date (meteor.properties.year).getFullYear(): ""}</td>
                        <td className={styles.tableRowData}>{meteor?.properties?.type}</td>
                        {meteor?.properties?.mass ? 
                            (<td className={styles.tableRowData}>{Math.round(meteor?.properties?.mass)}</td>) : (<td className={styles.tableRowData}>Unknown</td>)
                        }
                        <td className={styles.tableRowDataEnd}>{meteor?.properties?.location}</td>
                    </tr>)
                    })}

                </tbody>
            </table>
        </div>
    </div> : 
    <button className={styles.showButton} onClick={() => setOpen(true)}>Show Details</button>
  )
} 