import React from "react";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";
import { useContext } from "react";
import  CryptoContext  from "../../../Context/CryptoContext";
const CurrencySwitchButton = () => {
  const { currency, setCurrency } = useContext(CryptoContext);
  function toggleCurrency() {
      setCurrency(currency === "INR" ? "USD" : "INR");
  }
  
  return (
    <button
    onClick={toggleCurrency}
    className="flex items-center gap-2.5 px-5 py-2.5 border-none rounded-md bg-black text-white cursor-pointer text-xl"
  >
      {currency === "INR" ? <FaDollarSign /> : <FaRupeeSign />}
      Switch to {currency === "INR" ? "USD" : "INR"}
    </button>
  );
};

export default CurrencySwitchButton;
