import React from "react";

import homePageBanner from "../../assets/hero-banner.png";
import { TypedComponent } from "./PageComponents/Typed";
import TopCryptoDetails from "./PageComponents/TopCryptoDetails";
import MarketUpdate from "./PageComponents/AllCoinsUpdates/MarketUpdate";
import WhatIsCrypto from "./PageComponents/WhatIsCrypto";
import "./HomePage.css";
import NewsSection from "./PageComponents/NewsSection/NewsSection";
import Footer from "./PageComponents/Footer";
import { Button } from "@/components/ui/button";

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
            <Button className="w-1/2 border bg-indigo-800">Get Started Now</Button>
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
          <NewsSection />
          <WhatIsCrypto />
          <Footer />
        </div>
      </div>
    </div>
  );
};
