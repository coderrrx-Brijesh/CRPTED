import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import servicesImage from "../../assets/Hero-banner.png";

export const ServicesPage = () => {
  return (
    <div className="bg-primary min-h-screen text-white">
    <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-6xl font-bold">Our Services</h1>
            <p className="text-gray-400 mt-4">
                Explore the services we offer to make your crypto journey seamless and secure.
            </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <img 
                    src={servicesImage} 
                    alt="Services Illustration"
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Buy Crypto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Securely purchase cryptocurrencies with ease using our platform.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Sell Crypto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Convert your digital assets to cash quickly and hassle-free.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Market Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Get real-time updates and analytics to make informed decisions.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Wallet Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Keep your assets safe with our secure wallet solutions.
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</div>
  );
};
