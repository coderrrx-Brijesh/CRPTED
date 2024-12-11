import React from "react";
import laptopBanner from "../../../assets/laptop-banner.png";
const Cryptex = () => {
  return (
    <section className="bg-primary text-gray-300 py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 px-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={laptopBanner}
            alt="Laptop Mockup"
            className="w-full h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-white mb-6">What Is Cryptex</h1>
          <p className="text-lg mb-6">
            Experience a variety of trading on Bitcost. You can use various types of
            coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining,
            and margin.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-blue-500 text-2xl mr-4">✔</span>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  View real-time cryptocurrency prices
                </h3>
                <p className="text-sm">
                  Experience a variety of trading on Bitcost. You can use various
                  types of coin transactions such as Spot Trade, Futures Trade, P2P,
                  Staking, Mining, and margin.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 text-2xl mr-4">✔</span>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Buy and sell BTC, ETH, XRP, OKB, Etc...
                </h3>
                <p className="text-sm">
                  Experience a variety of trading on Bitcost. You can use various
                  types of coin transactions such as Spot Trade, Futures Trade, P2P,
                  Staking, Mining, and margin.
                </p>
              </div>
            </div>
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cryptex;
