import React from 'react'
import CartContextProvider from "./src/context/CartContext";
import {Routes} from './src/routes'

export default function App() {
  return (
    <CartContextProvider>
      <Routes />
    </CartContextProvider>
  );
}

/*
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock().then((result) => {
        let stockJSON = csvJSON(result)
        setStock(JSON.parse(stockJSON));
        setLoading(false);
        // console.log(stockJSON);
      })
  }, [loading])


{stock.map((item, i) => {
          return <Item key={i} itemName={item["ITEM NAME"]} itemID={item["ITEM ID"]} stock={item["STOCK"]} category={item["CATEGORY"]} salePrice={item["SALE PRICE PER ITEM"]} />
        })}
        */
