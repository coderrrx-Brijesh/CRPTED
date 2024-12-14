
import React, { useState, useContext } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "../../components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import CryptoContext from "../../Context/CryptoContext";
import { SearchBar } from "@/components/SearchBar";

export const TransferCryptoPage= ()=>{
  const { allCryptoData } = useContext(CryptoContext);
  const [sellAmount, setSellAmount] = useState();
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [feeAmount, setFeeAmount] = useState(0);
  const [sellCurrency, setSellCurrency] = useState("BTC");
  const [receiveCurrency, setReceiveCurrency] = useState("USD");
  const [localCurrency, setLocalCurrency] = useState("USD");
  const allUsersData = getAllUsers();
  const onSearch = (username) => {
    const filteredUser = allUsersData.filter((user)=> user.username.toLowerCase().startsWith(username.toLowerCase()));
    console.log(filteredUser);
  }
  const handleSwap = () => {
    const sellObj = allCryptoData.find(
      (crypto) => crypto.symbol.toLowerCase() === sellCurrency.toLowerCase()
    );
    const receiveRate = localCurrency === "USD" ? 80 : 1; // Assuming 1 USD = 80 INR
  
    if (sellObj && sellObj.current_price) {
      const calculatedAmount =
        (sellAmount * sellObj.current_price) / receiveRate;
      setReceiveAmount(calculatedAmount.toFixed(2));
      setFeeAmount((calculatedAmount * 0.005).toFixed(2));
    } else {
      console.error("Invalid data for conversion. Check allCryptoData or sellCurrency.");
    }
  };

  return (
    <div className="bg-[#0b0b0b] h-full flex flex-col items-center px-8 py-10 text-white">
      <h1 className="text-4xl font-bold mb-10">Sell Crypto</h1>
      <SearchBar onSearch={onSearch} />
      <div className="flex justify-between items-center">
        {/* Card 1 */}
        <Card className="w-full max-w-lg bg-gray-800 rounded-lg m-14">
          <CardHeader className="text-lg font-medium text-white">You Sell</CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(Number(e.target.value))}
                className="flex-1 text-white bg-black border border-gray-700 rounded-lg p-2"
                placeholder="0"
              />
              <Select
                onValueChange={(value) => setSellCurrency(value)}
                value={sellCurrency}
              >
                <SelectTrigger className="w-24 bg-gray-800 text-white border border-gray-400 rounded-lg">
                  <span>{sellCurrency}</span>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 h-60">
                  {allCryptoData.slice(0, 30).map((crypto) => (
                    <SelectItem
                      className="text-white flex items-center"
                      value={crypto.symbol}
                      key={crypto.symbol}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">{crypto.symbol}</div>
                        <img
                          src={crypto.image}
                          alt={`${crypto.name} logo`}
                          className="w-6"
                        />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-400">{sellAmount} {sellCurrency}</p>
          </CardContent>
        </Card>

        <Button
          variant="ghost"
          className="my-4 text-white-800 hover:bg-blue-500 bg-blue-700"
          onClick={handleSwap}
        >
          <ArrowLeftRight className="w-10 h-10 font-extrabold" />
        </Button>

        {/* Card 2 */}
        <Card className="w-full max-w-lg bg-gray-800 rounded-lg m-14">
          <CardHeader className="text-lg font-medium text-white">You Receive</CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={receiveAmount}
                className="flex-1 text-white bg-black border-grey-600 rounded-lg p-2"
                placeholder="0"
                disabled
              />
              <Select
                onValueChange={(value) => setLocalCurrency(value)}
                value={localCurrency}
              >
                <SelectTrigger className="w-24 bg-gray-800 text-white border border-gray-400 rounded-lg">
                  <span>{localCurrency}</span>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 h-20">
                  <SelectItem className="text-white" value="USD">USD</SelectItem>
                  <SelectItem className="text-white" value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-400 flex justify-between">
              <span>{receiveAmount} {localCurrency}</span>
              <span className="text-xs">~Transaction Fee {feeAmount} {localCurrency}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-8 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700" onClick={handleSwap}>
        Sell Now
      </Button>
    </div>
  );
};



