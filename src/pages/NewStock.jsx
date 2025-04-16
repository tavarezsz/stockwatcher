import React from 'react'
import Input from '../form/Input'
import CustomBtn from '../layout/CustomBtn'
import styles from './NewStock.module.css'
import { useState, useEffect } from 'react'
import StockCard from '../layout/StockCard'
import Message from '../layout/Message'

export default function NewStock() {
  const [cod,setCod] = useState("")
  const [preco,setPreco] = useState(0)
  const [stock,setStock] = useState(null)
  const [stCod,setStCod] = useState(null)
  const [stPreco,setStPreco] = useState(0)
  const [quant,setQuant] = useState(1)

  const currentDate = new Date()

  const datetime = `${currentDate.getDate()}/${currentDate.getMonth()+1} - ${currentDate.getHours()}:${currentDate.getMinutes()}`

  const [message,setMessage] = useState()
    const [msgType,setMsgType] = useState()

    function createPost(stock){

        fetch("http://localhost:5000/stocks", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
    
            },
            body: JSON.stringify(stock)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setMessage("A ação foi adicionada a sua carteira")
                setMsgType("success")
            })
            .catch((err) => {console.log(err)
                setMessage("Não foi possível adicionar a ação tente novamente")
                setMsgType("error")
            })
    
    }
    

  

  useEffect(() => {
     if (!stCod) return

     console.log(datetime)

 
     fetch(`https://brapi.dev/api/quote/${stCod}?token=${token}`)
       .then((res) => res.json())
       .then((data) => {

        const newStock = {
          ...data.results[0],
          buyPrice: stPreco,
          quantity: quant,
          lastUpdate: datetime
          
        }

        if(newStock.buyPrice==0){
          newStock.buyPrice = newStock.regularMarketPrice
        }


        setStock(newStock)
      })
   }, [stCod]);

  return (
    <div className={styles.newstock_container} >
        <h1>Cadastro de ações</h1>
        <p>Insira o código de 5 digitos da ação desejada para adiciona-lá à sua lista</p>
        
        <form className={styles.form} onSubmit={(e) =>{e.preventDefault()}}>
            <Input
            type='text' 
            text="Código da ação:" 
            name="cod" 
            placeholder="ex: BBSA3,PETR4"
            value={cod}
            handleChange={(e)=>{
              setCod(e.target.value)
            }
              
            }
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
              setStCod(cod)
              setStPreco(preco)
            }}  text="Submit"/>

        </form>
        
        { message &&  <Message msg={message} type={msgType}/> //não sei pq não funciona
        }

        {stock != null &&
        <>
          <p>Essa foi a ação encontrada, deseja adiciona-la a sua carteira?</p>

          <StockCard stock={stock} preco={stPreco} displayIcons={false}/>

          <CustomBtn func={() => {createPost(stock)
            setStock(null)}} text="Adicionar"/>
          <CustomBtn func={() => window.location.reload()} text="Cancelar"/>
        </>

        }


    </div>
  )
}
