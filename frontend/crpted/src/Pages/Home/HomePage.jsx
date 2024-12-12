import React from "react";
import { Button } from "../../components/ui/button";
import homePageBanner from "../../assets/hero-banner.png";
import { TypedComponent } from "./PageComponents/Typed";
import TopCryptoDetails from "./PageComponents/TopCryptoDetails";
import MarketUpdate from "./PageComponents/AllCoinsUpdates/MarketUpdate";
import WhatIsCrypto from "./PageComponents/WhatIsCrypto";
import "./HomePage.css";
import Footer from "./PageComponents/Footer";
// import backgroundImage from "../../assets/BG_img.png";

export const HomePage = () => {
    console.log("home");
    return (
        <div
            className="bg-primary relative min-h-screen"
            // style={{
            //     backgroundImage: `url(${backgroundImage})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
        >
            {/* Overlay for opacity */}
            <div className="absolute inset-0 bg-black opacity-85"></div>

            {/* Main content */}
            <div className="relative z-10">
                <div className="h-screen w-full flex justify-between px-8 pt-0">
                    <div className="ml-8 flex flex-col gap-10 w-2/5 items-start justify-center">
                        <h1 className="text-7xl font-bold text-white leading-snug">
                            Buy & Sell Digital Assets In The CRPTED
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Coin CRPTED is the <TypedComponent className="features" /> <br /> way to buy & sell crypto asset exchange.
                        </p>
                        <Button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
                            Get Started Now
                        </Button>
                    </div>
                    <div className="mr-8 flex flex-col items-center gap-10 w-2/5 justify-center">
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
