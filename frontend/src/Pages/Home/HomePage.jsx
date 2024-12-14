import React from "react";
import { Button } from "../../components/ui/button";
import homePageBanner from "../../assets/hero-banner.png";
import { TypedComponent } from "./PageComponents/Typed";
import TopCryptoDetails from "./PageComponents/TopCryptoDetails";
import MarketUpdate from "./PageComponents/AllCoinsUpdates/MarketUpdate";
import WhatIsCrypto from "./PageComponents/WhatIsCrypto";
import "./HomePage.css";
import Footer from "./PageComponents/Footer";

export const HomePage = () => {
  console.log("home");
  return (
    <div className="bg-primary relative min-h-screen bg-[#6a33ec]">
      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-black opacity-85"></div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="h-screen w-full flex justify-between px-8 pt-0">
          <div className="ml-8 flex flex-col gap-10 w-2/5 items-start justify-center">
            <h1 className="text-6xl font-bold text-white leading-snug">
              Buy & Sell Digital Assets In The CRPTED
            </h1>
            <p className="text-gray-400 text-lg">
              Coin CRPTED is the <TypedComponent className="features" /> <br />{" "}
              way to buy & sell crypto asset exchange.
            </p>
            <button class="relative inline-flex items-center justify-center rounded-2xl p-0.5 mb-2 me-2 overflow-hidden text-2xl font-medium text-gray-900 group bg-gradient-to-br from-purple-800 to-indigo-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl bg-opacity-0">
                Get Started Now
              </span>
            </button>
          </div>
          <div className="mr-8 flex flex-col items-center gap-10 w-2/5 justify-center opacity-90">
            <img
              src={homePageBanner}
              id="home-banner-img"
              className="w-full h-4/5 object-contain filter drop-shadow-lg slow-bounce"
              alt="hero-banner"
            />
          </div>
        </div>
        <TopCryptoDetails />
        <div>
          <MarketUpdate />
        </div>
        <WhatIsCrypto />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
