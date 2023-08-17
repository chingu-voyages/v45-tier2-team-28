import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

import styles from './styles/Modal.module.css'

export default function Modal() {
  const [open, setOpen] = useState(false)

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
                    <tr>
                        <td>Pinky</td>
                        <td>2023</td>
                        <td>L5</td>
                        <td>Large</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> : 
    <button onClick={() => setOpen(true)}>Show Details</button>
  )
} 