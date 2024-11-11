import React from "react";
import { Button } from "../../components/ui/button";
import homePageBanner from "../../assets/hero-banner.png";
import { TypedComponent } from "./PageComponents/Typed"; // imported typed component
import "./HomePage.css";
import CryptoDetails from "./PageComponents/CryptoDetails";
import MarketUpdate from "./PageComponents/AllCoinsUpdates/MarketUpdate";
export const HomePage = () => {
    console.log("home");
    return (
        <div  id="home-page-container">
            <div id="intro-container">
                <div className="left-container">
                    <h1 className="text-7xl font-bold text-white leading-snug">
                        Buy & Sell Digital Assets In The Cryptex
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Coin Cryptex is the <TypedComponent className="features" /> <br/> way to buy & sell crypto asset exchange.
                    </p>
                    <Button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
                        Get Started Now
                    </Button>
                </div>
                <div className="right-container">
                    <img src={homePageBanner} className="home-page-banner" alt="hero-banner" />
                </div>
            </div>
            <CryptoDetails/>
            <MarketUpdate />
        </div>
    );
};
