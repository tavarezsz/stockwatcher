import { useState, useEffect } from "react";
import StockCard from "../layout/StockCard";
import styles from "./MyStocks.module.css"
import SidePanel from "../layout/SidePanel";
import useUpdate from "../hooks/useUpdate";
import CustomBtn from "../layout/CustomBtn";

function MyStocks() {
    const [stocks, setStocks] = useState([])
    const [searchStocks,setSearchStocks] = useState([])

    const uniqueStocks = []


    const {updated, isLoading} = useUpdate(searchStocks,stocks) //hook para atualizar todas as ações quando clicar no botão
    
    
    useEffect(() =>{
      if(!isLoading)
        window.location.reload()
      
    },[isLoading])
    

    useEffect(() => {
        fetch("http://localhost:5000/stocks")
          .then(res => res.json())
          .then(data => {
            setStocks(data);
          })
          .catch(err => console.log(err));
      }, []);

    
    useEffect(()=>{

      stocks.forEach(st => {
        let unico=1

        if(uniqueStocks.length === 0)
          uniqueStocks.push(st)
        else{

          uniqueStocks.forEach(unSt =>{ //verifica se a ação já está no array
              if(unSt.symbol == st.symbol)
                unico = 0
          })

          if (unico==1)
            uniqueStocks.push(st)

        }
      });

    },[stocks])


  return (

    <div className={styles.stock_container}>
        <h1>Suas Ações</h1>
        <CustomBtn func={() => {
          setSearchStocks(uniqueStocks)
        }
      } text="Atualizar Todos"/>

        {stocks.map((st) => <StockCard stock={st}/>)}
        { stocks.length < 1 &&
          <p>Ops, não encontramos nenhuma ação em sua carteira</p>
          }
        
    </div>
  )
}

export default MyStocks