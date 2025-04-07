import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

export default function LinkButton({dest,text}) {
  return (
    <Link className={styles.btn} to={dest}>
        {text}
    </Link>
  )
}
