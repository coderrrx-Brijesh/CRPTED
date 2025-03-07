import React, { useState, useContext, useEffect } from "react";
import LogoImg from "../assets/Icons/Logo.png";
import { DropdownMenubar } from "./NavBarComponents/DropdownMenubar";
import { WalletButton } from "./NavBarComponents/WalletButton";
import LoginPopup from "./NavBarComponents/LoginPopup";
import SignupPopup from "./NavBarComponents/SignupPopup";
import LoginContext from "../Context/LogedinContext";
import { Button } from "../components/ui/button";
import { WalletIcon } from "lucide-react";

export const NavBar = () => {
  const { isLoggedIn, user, setShowPopup, showPopup } =
    useContext(LoginContext); // Add user from context
  const [localUser, setUser] = useState(null);

  // Use either the user from context or the local state
  const currentUser = user || localUser;

  const handlePopupToggle = (type) => {
    setShowPopup((prev) => (prev === type ? null : type));
  };

  // Close popup when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setShowPopup(null);
    }
  }, [isLoggedIn]);

  return (
    <div className=" top-0 sticky z-40">
      <nav className="flex items-center justify-between p-2.5 bg-black w-full font-semibold text-2xl">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-1 bg-white rounded-md p-1 ml-12">
          <div id="AppTitle" className="text-black text-2xl font-bold">
            CRPTED
          </div>
          <div id="Logo">
            <img src={LogoImg} alt="Logo" className="h-10 w-auto" />
          </div>
        </div>

        {/* Desktop React router links */}
        <div className="flex text-xl">
          <a
            href="/"
            className="text-gray-300 hover:text-white   hover:bg-slate-900 p-2 rounded-md "
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-300 hover:text-white  hover:bg-slate-900 p-2 rounded-md"
          >
            About
          </a>
          <a
            href="/TradeCrypto"
            className="text-gray-300 hover:text-white  hover:bg-slate-900 p-2 rounded-md"
          >
            Trade
          </a>
          <a
            href="/TransferCrypto"
            className="text-gray-300 hover:text-white  hover:bg-slate-900 p-2 rounded-md"
          >
            Transfer
          </a>
          <a
            href="/service"
            className="text-gray-300 hover:text-white  hover:bg-slate-900 p-2 rounded-md"
          >
            Services
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white  hover:bg-slate-900 p-2 rounded-md"
          >
            Contact
          </a>
        </div>

        {/* Only render DropdownMenubar when both isLoggedIn is true AND currentUser is not null */}
        {isLoggedIn && currentUser ? (
          <div className="flex space-x-8">
            <WalletButton onClick={() => alert("coming soon")} />
            <DropdownMenubar user={currentUser} />
          </div>
        ) : (
          <div className="flex space-x-8">
            <Button
              onClick={() => handlePopupToggle("login")}
              className="flex items-center space-x-2 bg-indigo-700  hover:bg-indigo-600"
            >
              <WalletIcon className="w-5 h-5 text-white" />
              <span>LOGIN</span>
            </Button>
            <Button
              onClick={() => handlePopupToggle("signup")}
              className="flex items-center space-x-2 bg-white text-indigo-800 text-bold hover:bg-indigo-200"
            >
              <WalletIcon className="w-5 h-5 " />
              <span>SIGNUP</span>
            </Button>
          </div>
        )}
      </nav>

      {/* Popup Components */}
      {showPopup === "login" && (
        <div className="fixed flex items-center justify-center inset-0 z-50 backdrop-blur">
          <LoginPopup setuser={setUser} />
          <Button
            onClick={() => setShowPopup(null)}
            className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            x
          </Button>
        </div>
      )}
      {showPopup === "signup" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
          <SignupPopup />
          <Button
            onClick={() => setShowPopup(null)}
            className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            X
          </Button>
        </div>
      )}
      <div className="border-slate-700 border-t"></div>
    </div>
  );
};
