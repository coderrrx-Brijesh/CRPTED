import React, { useState } from "react";
import LogoImg from "../assets/Icons/Logo.png";
import { DropdownMenubar } from "./NavBarComponents/DropdownMenubar";
import { WalletButton } from "./NavBarComponents/WalletButton";
import LoginPopup from "./NavBarComponents/LoginPopup";
import SignupPopup from "./NavBarComponents/SignupPopup"; // Add a similar SignupPopup component if you have one.
import LoginContext from "../Context/LogedinContext";
import { Button } from "../components/ui/button";
import { WalletIcon } from "lucide-react";

export const NavBar = () => {
  const { isLoggedIn } = useState(LoginContext);
  const [showPopup, setShowPopup] = useState(null); // 'login', 'signup', or null

  const handlePopupToggle = (type) => {
    setShowPopup((prev) => (prev === type ? null : type));
  };

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-black min-w-96 font-semibold text-2xl">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-4 bg-white rounded-md p-2.5 ml-4 ">
          <div id="AppTitle" className="text-black text-3xl font-bold">
            CRPTED
          </div>
          <div id="Logo">
            <img src={LogoImg} alt="Logo" className="h-10 w-auto" />
          </div>
        </div>

        {/* Desktop React router links */}
        <div className="flex space-x-6">
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="/about" className="text-gray-300 hover:text-white">
            About
          </a>
          <a href="/BuyCrypto" className="text-gray-300 hover:text-white">
            BuyCrypto
          </a>
          <a href="/SellCrypto" className="text-gray-300 hover:text-white">
            SellCrypto
          </a>
          <a href="/service" className="text-gray-300 hover:text-white">
            Services
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </a>
        </div>

        {isLoggedIn ? (
          <div className="flex space-x-8 ">
            <WalletButton onClick={() => alert("hi")} />
            <DropdownMenubar />
          </div>
        ) : (
          <div className="flex space-x-8">
            <Button
              onClick={() => handlePopupToggle("login")}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <WalletIcon className="w-5 h-5 text-white" />
              <span>LOGIN</span>
            </Button>
            <Button
              onClick={() => handlePopupToggle("signup")}
              className="flex items-center space-x-2 bg-white hover:bg-white-700 text-indigo-700 text-bold"
            >
              <WalletIcon className="w-5 h-5 text-indigo-700" />
              <span>SIGNUP</span>
            </Button>
          </div>
        )}
      </nav>

      {/* Popup Components */}
      {showPopup === "login" && (
        <div className="fixed flex items-center justify-center inset-0 z-50 backdrop-blur ">
          <LoginPopup />
          <Button
            onClick={() => setShowPopup(null)}
            className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            x
          </Button>
        </div>
      )}
      {showPopup === "signup" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur ">
          <SignupPopup />
          <Button
            onClick={() => setShowPopup(null)}
            className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            X
          </Button>
        </div>
      )}
    </div>
  );
};
