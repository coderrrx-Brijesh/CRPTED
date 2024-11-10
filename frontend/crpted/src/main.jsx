import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CryptoContextProvider } from "./Context/CryptoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </StrictMode>
);
