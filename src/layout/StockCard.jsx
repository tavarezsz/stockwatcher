import React, { useEffect, useState } from 'react'
import styles from './StockCard.module.css'
import CustomBtn from '../layout/CustomBtn'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Message from './Message'
import { TiEdit, TiTrash } from "react-icons/ti";
import { TiPlusOutline } from "react-icons/ti";
import SidePanel from './SidePanel'
import EditStock from '../pages/EditStock'



export default function StockCard({stock,displayIcons}) {

  const [showPanel,setShowPanel] = useState(false)
  const navigate = useNavigate()
  const vtotal = (stock.regularMarketPrice*stock.quantity).toFixed(2)

  const[showDetails,setShowDetails] = useState(true)

  const handleEdit = () =>{
    navigate(`/editstock/${stock.id}`)
  }

  const handleCap = (cap) =>{ //ajusta o numero da capitalização
    if(cap/1000000000 >=1)//1 bi
      return`R$ ${(cap/1000000000).toFixed(2)}B`
    else
      return`R$ ${(cap/1000000).toFixed(2)}M`

  }

  function deleteStock(stock){

      fetch(`http://localhost:5000/stocks/${stock.id}`, {
          method: "DELETE",
          headers: {
              'Content-type': "application/json",
  
          },
          body: JSON.stringify(stock)
      })
          .then((resp) => {resp.json()
          })
          .catch((err) => {console.log(err)
  
          })
  
  }

    let variacao=0
    let lucro=0


    if(stock.buyPrice){
        variacao = ((stock.regularMarketPrice / stock.buyPrice) *100) - 100
        variacao = variacao.toFixed(2)
    }


    lucro = (((variacao/100 +1) * vtotal) - vtotal).toFixed(2)

    
  return (
    <>
        <div className={styles.card}>

            {(variacao > 0)
            ? <h3>{stock.longName.slice(0,-4)}      <span className={styles.lucro}>+{variacao}%</span></h3>
            : <h3>{stock.longName.slice(0,-4)}      <span className={styles.perda}>{variacao}%</span></h3>
            }
            
            <p>Preço de compra: {stock.buyPrice}</p>
            <p>Preço atual: {stock.regularMarketPrice}</p>
            <p>Variação anual: <span>{stock.fiftyTwoWeekLow}</span> - <span>{stock.fiftyTwoWeekHigh}</span></p>

            {displayIcons==false || (

              <div className={styles.btn_container}>
                <button onClick={()=>{
                  setShowDetails(true)
                  setShowPanel(true)
                }} className={styles.icon_button}><TiPlusOutline size={30}/></button>

                <button onClick={() => {
                  setShowDetails(false)
                  setShowPanel(true)
                }} className={styles.icon_button}><TiEdit size={30}/></button>

                <button className={styles.icon_button} onClick={() => {
                  deleteStock(stock)
                  window.location.reload()
                }}><TiTrash size={30}/></button>

              

              <SidePanel show={showPanel} onClose={() => setShowPanel(false)}>
              {(showDetails) ? (
                <div className={styles.details_container}>
                  <h2>Detalhes de {stock.symbol}</h2>
                  <ul>
                    <li>Capitalização: {handleCap(stock.marketCap)}</li>
                    <li>Preço de compra: R${stock.buyPrice}</li>
                    <li> Quantidade: {stock.quantity}</li>
                    <li>Valor de venda: R${vtotal}</li>
                    <li>Lucro: R${lucro}</li>
                  </ul>

                  <h3>Indicadores Diarios </h3>
                  <ul>
                    <li>preço atual: R${stock.regularMarketPrice}</li>
                    <li>Variação hoje: {stock.regularMarketChangePercent.toFixed(2)}%</li>
                    <li>Ultima abertura: R${stock.regularMarketOpen}</li>
                    <li>Ultimo fechamento: R${stock.regularMarketPreviousClose}</li>
                    <li>Variação diaria: {stock.regularMarketDayRange}</li>
                  </ul>

                  <h3>Indicadores de longo prazo</h3>
                  <ul>
                    <li>Variação Anual: {stock.fiftyTwoWeekRange}</li>
                    <li>LPA:  {stock.earningsPerShare.toFixed(2)}</li>
                    <li>P/L:  {stock.priceEarnings}</li>

                  </ul>
                  <p>*Ultima atualização: {stock.lastUpdate}</p>
                </div>
              ) : 
              <EditStock stock={stock}/>
              }

              </SidePanel>

              
              </div>


            )}

            <img className={styles.logo} src={stock.logourl} alt="" />


        </div>

    </>
    
  )
}
