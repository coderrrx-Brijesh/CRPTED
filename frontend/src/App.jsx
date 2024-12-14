import "./App.css";
import { NavBar } from "./NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/Home/HomePage";
import { AboutPage } from "./Pages/About/AboutPage";
import { TradeCryptoPage } from "./Pages/TradeCrypto/TradeCryptoPage";
import { TransferCryptoPage } from "./Pages/TransferCrypto/TransferCryptoPage";
import { ContactPage } from "./Pages/Contact/ContactPage";
import { ServicesPage } from "./Pages/Service/ServicesPage";

function App() {
  return (
    <div className="app-div">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/About" element={<AboutPage/>}></Route>
          <Route path="/TradeCrypto" element={<TradeCryptoPage/>}></Route>
          <Route path="/TransferCrypto" element={<TransferCryptoPage/>}></Route>
          <Route path="/Service" element={<ServicesPage/>}></Route>
          <Route path="/Contact" element={<ContactPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
