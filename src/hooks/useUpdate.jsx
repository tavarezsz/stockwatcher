import { useEffect, useState } from 'react';

const token = "jSr9d1QtV7ifskpkmA1k1c";

const useUpdate = (uniqueStocks, stocks) => {
  const [updatedStocks, setUpdatedStocks] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  // Primeiro useEffect: atualiza os dados com a API externa
  useEffect(() => {
    if (!uniqueStocks || uniqueStocks.length === 0) return;

    Promise.all(
      uniqueStocks.map(st =>
        fetch(`https://brapi.dev/api/quote/${st.symbol}?token=${token}`)
          .then(res => res.json())
          .then(data => ({
            ...data.results[0]
          }))
          .catch(err => {
            console.error(err);
            return null;
          })
      )
    ).then(result => {
      const validStocks = result.filter(st => st !== null);
      const updated = stocks.map(st =>{
      const match = validStocks.find(vst => vst.symbol === st.symbol);

        if (match) {
        return {
            ...match,
            id: st.id,
            buyPrice: st.buyPrice,
            quantity: st.quantity
            };
        }
    
    
    })
      console.log(updated)

      setUpdatedStocks(updated);
      console.log(updated)

      }
    
    )


    },[uniqueStocks]);

  // Segundo useEffect: envia PATCH com os dados atualizados
  useEffect(() => {
    if (!updatedStocks || updatedStocks.length === 0) return;

    const currentDate = new Date();
    const datetime = `${currentDate.getDate()}/${currentDate.getMonth() + 1} - ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    updatedStocks.forEach(stock => {
      fetch(`http://localhost:5000/stocks/${stock.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          ...stock,
          lastUpdate: datetime
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(`Atualizado: ${stock.id}`, data);
          setIsLoading(false)
        })
        .catch((err) => console.error(`Erro ao atualizar ${stock.id}:`, err));
        setIsLoading(false)
    });

  }, [updatedStocks]);

  return { updatedStocks, isLoading }; // se quiser usar no componente
};

export default useUpdate;
