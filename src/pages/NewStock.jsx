import React from 'react'
import Input from '../form/Input'
import CustomBtn from '../layout/CustomBtn'
import styles from './NewStock.module.css'
import { useState, useEffect } from 'react'
import StockCard from '../layout/StockCard'

export default function Home() {
  const [cod,setCod] = useState("")
  const [preco,setPreco] = useState(0)
  const [stock,setStock] = useState(null)
  const [stCod,setStCod] = useState(null)
  const [stPreco,setStPreco] = useState(0)
  const [quant,setQuant] = useState(1)

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
    

  const token = "jSr9d1QtV7ifskpkmA1k1c"//tirar depois

  useEffect(() => {
     if (!stCod) return
 
     fetch(`https://brapi.dev/api/quote/${stCod}?token=${token}`)
       .then((res) => res.json())
       .then((data) => {
        
        const newStock = {
          ...data.results[0],
          buyPrice: stPreco,
          quantity: quant
          
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
        
        {message &&  <Message type={msgType} msg={message}/>}
        {//ajeitar tudo isso dps
        }

      
        {(stock &&
          <p>Essa foi a ação encontrada, deseja adiciona-la a sua carteira?</p>
          <StockCard stock={stock} preco={stPreco}/>
          <CustomBtn func={() => createPost(stock)} text="Adicionar"/>
        }



    </div>
  )
}
