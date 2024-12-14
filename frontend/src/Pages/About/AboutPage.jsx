import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import aboutPageImage from "../../assets/hero-banner.png";
import backgroundImage from "../../assets/BG_img.png";

export const AboutPage = () => {
  return (
    <div
      className="bg-primary min-h-screen flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for background opacity */}
      <div className="absolute inset-0 bg-black opacity-85"></div>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-white leading-snug">
              About Cryptex
            </h1>
            <p className="text-lg text-gray-400 mt-6">
              Cryptex is your one-stop platform for buying, selling, and managing digital assets securely. 
              We empower users to take control of their financial future by offering tools, insights, 
              and educational resources for informed trading and investing.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Our platform prioritizes ease of use, security, and transparency, ensuring a seamless experience for everyone.
            </p>
            <Button className="mt-6">Learn More</Button>
          </div>
          <div className="flex-1">
            <img
              src={aboutPageImage}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              alt="About Cryptex"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              We use cutting-edge encryption and multi-factor authentication to keep your assets safe.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              Real-time market data and detailed transaction histories ensure clarity and trust.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              Stay ahead with our intuitive interface and advanced trading tools tailored for all users.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
