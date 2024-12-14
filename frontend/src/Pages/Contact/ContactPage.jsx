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
            <img
              src="/path/to/contact-page-image.jpg"
              alt="Contact Illustration"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1">
            <Card className="p-6 bg-secondary">
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
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-gray-400 leading-relaxed">
          We are a dedicated team of second-year students at ABV IIITM Gwalior, combining our unique skills and passions to create innovative solutions for the digital world. Brijesh Singh, with a strong foundation in C++, web development, and problem-solving, brings a keen eye for efficiency and optimization in every project. Alongside him, Avan Sahu’s expertise in C++, React, and modern UI frameworks like Tailwind CSS and ShadCN UI helps us craft intuitive, user-friendly experiences.

Together, we are working on a range of exciting projects, including a live crypto tracker and a bot designed to analyze stock trends. Avan focuses on enhancing user accessibility in the digital asset space, while Brijesh specializes in building optimized, scalable systems that tackle real-world problems.

Our goal is to create seamless and efficient digital tools that make technology more accessible and impactful for everyone. We’re always open to collaborations and queries, so feel free to reach out to us!
          </p>
        </div>
      </div>
    </div>
  );
};
