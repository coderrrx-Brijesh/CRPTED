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
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {currency === "INR" ? <FaDollarSign /> : <FaRupeeSign />}
      Switch to {currency === "INR" ? "USD" : "INR"}
    </button>
  );
};

export default CurrencySwitchButton;
