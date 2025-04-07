import React from 'react'
import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton'

export default function Home() {
  return (
    <div className={styles.home_container}>
        <h1>Bem vindo ao <span>StockWatcher</span></h1>
        <p>Tome controle da sua vida financeira com todos os seus investimentos em um só lugar!</p>
        <LinkButton dest="/newstock"text="Comece Agora"/>

    </div>
  )
}
