import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../../components/ui/select";
import CryptoContext from "../../Context/CryptoContext";
import { SearchBar } from "@/components/SearchBar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {RandomAvatar} from "./PageComponents/RandomAvatar";
export const TransferCryptoPage = () => {
  const { allCryptoData, currency, setCurrency } = useContext(CryptoContext);
  const [allUsers, setAllUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferCoin, setTransferCoin] = useState("Bitcoin");
  const [cryptoCount, setCryptoCount] = useState();
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  async function getAllUsers() {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/allusersdata`);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const onSearch = (userName) => {
    setUserName(userName);
  };

  const toggleCurrency = () => {
    const newCurrency = currency === "USD" ? "INR" : "USD";
    setCurrency(newCurrency);
    setIsDataReady(false);
  };

  function calculateTotal() {
    if (!transferCoin || !cryptoCount) {
      setTransferAmount(0);
      return;
    }
    const cryptoPrice = allCryptoData?.find(
      (crypto) => crypto.name.toLowerCase() === transferCoin.toLowerCase()
    );
    if (cryptoPrice) {
      setTransferAmount(cryptoCount * cryptoPrice.current_price);
    } else {
      setTransferAmount(0);
    }
  }

  useEffect(() => {
    if (allCryptoData.length > 0) {
      setIsDataReady(true);
    }
  }, [allCryptoData]);

  useEffect(() => {
    if (isDataReady) {
      calculateTotal();
    }
  }, [isDataReady, transferCoin, cryptoCount]);

  const handleCryptoCountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setCryptoCount(value);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setUserName("");  // Clear the search term after selecting a user
  };

  const currencySymbol = currency === "USD" ? "$" : "₹";

  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-10 py-10 bg-gradient-to-br from-black via-[#2c0146] to-[#1e0c34] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#e6ceff]">
        Transfer Crypto
      </h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md relative flex justify-center">
        <SearchBar onSearch={onSearch} placeholder={"Search by Username"} />
        {userName && (
          <div className="absolute top-[80%] w-full bg-gray-800 py-2 rounded-lg shadow-lg z-10">
            {allUsers
              .filter((user) => user.userName.toLowerCase().startsWith(userName.toLowerCase()))
              .map((user, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer"
                  onClick={() => selectUser(user)}
                >
                  <Avatar className="mr-3 border-2 border-purple-600 p-1">
                  <AvatarImage
                      src={`https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Kurt&facialHairType=BeardLight&clotheType=Hoodie&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&seed=${user.firstName} ${user.lastName}`}
                      alt={user.userName}
                  />
                    <AvatarFallback>{user.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-400">{user.userName}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Transfer Form */}
      <Card className="bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-lg border border-[#6d28d9]">
        <CardHeader className="text-2xl font-semibold text-center text-[#a78bfa]">
          Select Crypto to Transfer
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select value={transferCoin} onValueChange={setTransferCoin}>
              <SelectTrigger className="w-full bg-gray-700 text-white">
                <div>{transferCoin}</div>
              </SelectTrigger>
              <SelectContent>
                {allCryptoData?.map((crypto, index) => (
                  <SelectItem key={index} value={crypto.name}>
                    {crypto.name} ({crypto.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Input
              type="number"
              placeholder="Number of Coins to Transfer"
              value={cryptoCount}
              onChange={handleCryptoCountChange}
              className="text-white bg-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="text-sm text-gray-400 mb-6">
            Amount to Transfer: {currencySymbol}
            {transferAmount.toFixed(2)}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={toggleCurrency}
              className="bg-[#9333ea] hover:bg-[#7e22ce] text-white px-4 py-2 rounded-lg transition-all"
            >
              Switch to {currency === "USD" ? "INR" : "USD"}
            </Button>
            <p className="text-sm text-gray-400">Current Currency: {currency}</p>
          </div>
        </CardContent>
      </Card>

      {/* Selected User Info */}
      {selectedUser && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Recipient</h2>
          <div className="flex items-center">
            <Avatar className="mr-3 border-2 border-purple-600 p-1">
              <AvatarImage
                src={`https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Kurt&facialHairType=BeardLight&clotheType=Hoodie&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&seed=${selectedUser.firstName} ${selectedUser.lastName}`}
                alt={selectedUser.userName}
              />
              <AvatarFallback>{selectedUser.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser.firstName } {selectedUser.lastName}</p>
              <p className="text-sm text-gray-400">{selectedUser.userName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
