import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

export default function LinkButton({text}) {
  return (
    <button className={styles.btn}>
        {text}
    </button>
  )
}
