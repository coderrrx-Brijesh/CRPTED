import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import backgroundImage from "../../assets/contact_bg.webp";

export const ContactPage = () => {
  return (
    <div
      className="bg-primary min-h-screen text-white relative"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition:'50% 25%', }}
    >
      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-black opacity-85 dark"></div> {/* Adjust opacity here */}
      
      <div className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold">Contact Us</h1>
          <p className="text-gray-400 mt-4">
            Let's connect! Whether you have questions or feedback, we’re here to help.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <Card className="p-6 bg-secondary w-1/2 m-auto">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-400 leading-relaxed">
            My name is Avan Sahu, a second-year student at ABV IIITM Gwalior. I am passionate about building projects that solve real-world problems, particularly in areas like stock market analysis and blockchain technology. I have experience with C++, React, and modern UI frameworks like Tailwind CSS and ShadCN UI. I am currently working on a bot to analyze stock trends and a crypto website to enhance user accessibility in the digital asset space. Feel free to reach out to me for collaborations or queries related to my work.
          </p>
        </div>
      </div>
    </div>
  );
};
