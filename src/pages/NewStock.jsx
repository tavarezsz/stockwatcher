import React from 'react'
import Input from '../form/Input'
import CustomBtn from '../layout/CustomBtn'
import styles from './NewStock.module.css'

function submit(){
}

export default function Home() {
  return (
    <div className={styles.newstock_container} >
        <h1>Cadastro de ações</h1>
        <p>Insira o código de 5 digitos da ação desejada para adiciona-lá à sua lista</p>
        
        <form className={styles.form} onSubmit={submit}>
            <Input
            type='text' 
            text="Código da ação:" 
            name="name" 
            placeholder="ex: BBSA3,PETR4"
           ></Input>

            <CustomBtn text="Submit"/>
        </form>


    </div>
  )
}
