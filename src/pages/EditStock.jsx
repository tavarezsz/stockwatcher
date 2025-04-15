import React, { useEffect, useState } from 'react'

import styles from './EditStock.module.css'
import Input from '../form/Input'
import CustomBtn from '../layout/CustomBtn'
import { useParams } from 'react-router-dom'
import Message from '../layout/Message'
import SidePanel from '../layout/SidePanel'

export default function EditStock({stock}) {

    const [preco,setPreco] = useState();
    const [quant,setQuant] = useState();

    const [message,setMessage] = useState("")
    const [msgType,setMsgType] = useState("")

    const currentDate = new Date()

    const datetime = `${currentDate.getDate()}/${currentDate.getMonth()+1} - ${currentDate.getHours()}:${currentDate.getMinutes()}`

    function patchStock(stock){
        fetch(`http://localhost:5000/stocks/${stock.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': "application/json",
    
            },
            body: JSON.stringify({
                buyPrice: preco,
                quantity:quant,
                lastUpdate:datetime
            })
        })
            .then((resp) => {resp.json()
            })
            .then((data) => {
                console.log(data)
                setMessage("Atualizado com sucesso")
                setMsgType("success")
            })
            .catch((err) => {console.log(err)
                setMessage("Erro ao atualizar ", err)
                setMsgType("error")
            })
    }

    if (!stock) {
        return <p>Carregando...</p>;
      }

  return (
    <div className={styles.container}>
        <h1>Editar {stock.symbol}</h1>
        <form className={styles.form} onSubmit={(e) =>{e.preventDefault()}}>
            <Input
            type='text' 
            text="Código da ação:" 
            name="cod" 
            placeholder="ex: BBSA3,PETR4"
            value={stock.symbol}
            readOnly={true}
        ></Input>

            <Input
            type='number' 
            text="Preço de compra da ação:" 
            name="preco" 
            placeholder="Você pode definir um valor personalizado"
            value={preco}
            handleChange={(e)=>{
            setPreco(e.target.value)
            }}
        ></Input>

        <Input
            type='number' 
            text="Quantidade de ações:" 
            name="quant" 
            placeholder="sla"
            value={quant}
            handleChange={(e)=>{
            setQuant(e.target.value)
            }}
        ></Input>

            <CustomBtn func={()=>{
            patchStock(stock)
            setTimeout(() => {
                window.location.reload();
                <Message msg={message} type={msgType}/>

            },1200)


            }}  text="Alterar"/>
    </form>

    {message && <Message msg={message} type={msgType}/>}

    </div>
  )

}
