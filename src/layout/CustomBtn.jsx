import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

export default function CustomBtn({func,text}) {
  return (
    <button onClick={func} className={styles.btn}>
        {text}
    </button>
  )
}
