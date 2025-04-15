import { useState, useEffect } from "react";
import StockCard from "../layout/StockCard";
import styles from "./MyStocks.module.css"
import SidePanel from "../layout/SidePanel";

function MyStocks() {
    const [stocks, setStocks] = useState([])


    useEffect(() => {
        fetch("http://localhost:5000/stocks")
          .then(res => res.json())
          .then(data => {
            setStocks(data);
          })
          .catch(err => console.log(err));
      }, []);
      
  return (

    <div className={styles.stock_container}>
        <h1>Suas Ações</h1>
        {stocks.map((st) => <StockCard stock={st}/>)}
        { stocks.length < 1 &&
          <p>Ops, não encontramos nenhuma ação em sua carteira</p>
          }
        
    </div>
  )
}

export default MyStocks