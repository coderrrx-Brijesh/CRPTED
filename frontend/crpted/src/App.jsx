import "./App.css";
import { NavBar } from "./NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/Home/HomePage";
import { AboutPage } from "./Pages/About/AboutPage";
import { BuyCryptoPage } from "./Pages/BuyCryptoPage/BuyCryptoPage";
import { SellCryptoPage } from "./Pages/SellCrypto/SellCryptoPage";
import { ContactPage } from "./Pages/Contact/ContactPage";
import { ServicePage } from "./Pages/Service/ServicesPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/About" element={<AboutPage/>}></Route>
          <Route path="/BuyCrypto" element={<BuyCryptoPage/>}></Route>
          <Route path="/SellCrypto" element={<SellCryptoPage/>}></Route>
          <Route path="/Service" element={<ServicePage/>}></Route>
          <Route path="/Contact" element={<ContactPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
