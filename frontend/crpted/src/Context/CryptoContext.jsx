import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating the context to store cryptocurrency data and settings.
const CryptoContext = createContext();

// Provider component that wraps the children and provides the context values.
export const CryptoContextProvider = (props) => {
  const [allCryptoData, setAllCryptoData] = useState([]);
  const [currency, setCurrency] = useState("inr");
  //  fetch cryptocurrency data from CoinGecko API.
  const fetchdata = async () => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: { vs_currency: currency}, 
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PAD5i6MjsqAgusMstpzG8Mpb",
      },
    };

    try {
      const res = await axios.request(options);
      console.log(res.data);  
      setAllCryptoData(res.data);  
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // useEffect hook to refetch data whenever the currency changes.
  useEffect(() => {
    fetchdata();
  }, []); 

  // Context value includes cryptocurrency data and functions to update currency.
  const Crypto = { allCryptoData,setAllCryptoData, setCurrency, currency };

  return (
    // Providing the context value to children components.
    <CryptoContext.Provider value={Crypto}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
