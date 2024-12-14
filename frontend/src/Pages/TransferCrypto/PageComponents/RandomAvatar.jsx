import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// A function to generate a random cartoon-style avatar based on userName
const generateCartoonAvatar = (userName) => {
  const avatarURL = `https://avatars.dicebear.com/api/avataaars/${userName}.svg`; // You can change "avataaars" to other styles like "bottts" or "gridy"
  return avatarURL;
};

export  const RandomAvatar = ({ userName }) => {
  return (
    <Avatar className="mr-3">
      <AvatarImage src={generateCartoonAvatar(userName)} alt={userName} />
      <AvatarFallback>{userName[0]}</AvatarFallback>
    </Avatar>
  );
};
