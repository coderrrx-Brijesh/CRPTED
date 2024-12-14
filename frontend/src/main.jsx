import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CryptoContextProvider } from "./Context/CryptoContext";
import { LogedinProvider } from "./Context/LogedinContext";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <CryptoContextProvider>
    <LogedinProvider>
    <Toaster /> 
      <App />
    </LogedinProvider>
    </CryptoContextProvider>
 
);
