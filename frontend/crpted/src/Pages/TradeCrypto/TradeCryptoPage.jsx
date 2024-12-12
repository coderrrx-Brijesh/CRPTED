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
import usdIcon from "../../assets/Icons/usd.png";
import inrIcon from "../../assets/Icons/rupee.png";
import { handleSwap } from "./Tradecomponents/Handleswap";

export const TradeCryptoPage = () => {
  const { allCryptoData, currency } = useContext(CryptoContext);
  const [payAmount, setPayAmount] = useState();
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [FeeAmount, setFeeAmount] = useState(0);
  const [payCurrency, setPayCurrency] = useState("SOL");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");

  return (
    <div className="bg-[#0b0b0b] h-full flex flex-col items-center px-8 py-10 text-white">
      <h1 className="text-4xl font-bold mb-10">Crypto Exchange</h1>
      <div className="flex justify-between items-center">
        {/* Card 1 */}
        <Card className="w-full max-w-lg bg-gray-800 rounded-lg m-14">
          <CardHeader className="text-lg font-medium text-white">
            You Pay
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="flex-1 text-white bg-black border border-gray-700 rounded-lg p-2"
                placeholder="$0"
              />
              <Select
                onValueChange={(value) => setPayCurrency(value)}
                value={payCurrency}
              >
                <SelectTrigger className="w-24 bg-gray-800 text-white border border-gray-400 rounded-lg">
                  <span>{payCurrency}</span>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 h-60">
                  <SelectItem
                    className="text-white flex items-center"
                    value={"USD"}
                    key={"USD"}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">USD</div>
                      <img src={usdIcon} alt={`USD logo`} className="w-6" />
                    </div>
                  </SelectItem>
                  <SelectItem
                    className="text-white flex items-center"
                    value={"INR"}
                    key={"INR"}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">INR</div>
                      <img src={inrIcon} alt={`INR logo`} className="w-6" />
                    </div>
                  </SelectItem>
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
            <p className="text-sm text-gray-400">
              {payAmount} {payCurrency}
            </p>
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
          <CardHeader className="text-lg font-medium text-white">
            You Receive
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={receiveAmount}
                className="flex-1 text-white bg-black border-grey-600 rounded-lg p-2"
                placeholder="$0"
                // disabled
              />
              <Select
                onValueChange={(value) => setReceiveCurrency(value)}
                value={receiveCurrency}
              >
                <SelectTrigger className="w-24 bg-gray-800 text-white border border-gray-400 rounded-lg">
                  <span>{receiveCurrency}</span>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 h-60">
                  <SelectItem
                    className="text-white flex items-center"
                    value={"USD"}
                    key={"USD"}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">USD</div>
                      <img src={usdIcon} alt={`USD logo`} className="w-6" />
                    </div>
                  </SelectItem>
                  <SelectItem
                    className="text-white flex items-center"
                    value={"INR"}
                    key={"INR"}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">INR</div>
                      <img src={inrIcon} alt={`INR logo`} className="w-6" />
                    </div>
                  </SelectItem>
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
            <div className="text-sm text-gray-400  flex justify-between">
              <span>
                {receiveAmount} {receiveCurrency}
              </span>
              <span className="text-xs">
                ~Exchange Fee {FeeAmount} {receiveCurrency}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        className="mt-8 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        onClick={handleSwap}
      >
        Exchange Now
      </Button>
    </div>
  );
};
