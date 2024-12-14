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
import liveBg from "../../assets/bitcoin-cryptocurrency.mp4"

export const TradeCryptoPage = () => {
  const { allCryptoData, currency } = useContext(CryptoContext);
  const [payAmount, setPayAmount] = useState();
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [FeeAmount, setFeeAmount] = useState(0);
  const [payCurrency, setPayCurrency] = useState("SOL");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const handleSwap = () => {
    const usdToInrRate = 80; // Conversion rate: 1 USD = 80 INR

    if (payCurrency === "USD" && receiveCurrency === "INR") {
      const calculatedAmount = payAmount * usdToInrRate;
      setReceiveAmount(calculatedAmount.toFixed(2));
      setFeeAmount((calculatedAmount * 0.005).toFixed(2));
    } else if (payCurrency === "INR" && receiveCurrency === "USD") {
      const calculatedAmount = payAmount / usdToInrRate;
      setReceiveAmount(calculatedAmount.toFixed(2));
      setFeeAmount((calculatedAmount * 0.005).toFixed(2));
    } else if (payCurrency === "USD" || payCurrency === "INR") {
      const cryptoObj = allCryptoData.find(
        (crypto) =>
          crypto.symbol.toLowerCase() === receiveCurrency.toLowerCase()
      );
      if (cryptoObj) {
        const cryptoPriceInFiat =
          currency === "INR"
            ? cryptoObj.current_price * usdToInrRate
            : cryptoObj.current_price;
        const calculatedAmount = payAmount / cryptoPriceInFiat;
        setReceiveAmount(calculatedAmount.toFixed(6));
        setFeeAmount((calculatedAmount * 0.005).toFixed(6));
      } else {
        console.error("Invalid data for crypto conversion.");
      }
    } else if (receiveCurrency === "USD" || receiveCurrency === "INR") {
      const cryptoObj = allCryptoData.find(
        (crypto) => crypto.symbol.toLowerCase() === payCurrency.toLowerCase()
      );
      if (cryptoObj) {
        const cryptoPriceInFiat =
          currency === "INR"
            ? cryptoObj.current_price * usdToInrRate
            : cryptoObj.current_price;
        const calculatedAmount =
          receiveCurrency === "INR"
            ? payAmount * cryptoPriceInFiat * usdToInrRate
            : payAmount * cryptoPriceInFiat;
        setReceiveAmount(calculatedAmount.toFixed(2));
        setFeeAmount((calculatedAmount * 0.005).toFixed(2));
      } else {
        console.error("Invalid data for fiat conversion.");
      }
    } else {
      const payObj = allCryptoData.find(
        (crypto) => crypto.symbol.toLowerCase() === payCurrency.toLowerCase()
      );
      const receiveObj = allCryptoData.find(
        (crypto) =>
          crypto.symbol.toLowerCase() === receiveCurrency.toLowerCase()
      );
      if (
        payObj &&
        receiveObj &&
        payObj.current_price &&
        receiveObj.current_price
      ) {
        const payPriceInUSD =
          currency === "INR"
            ? payObj.current_price / usdToInrRate
            : payObj.current_price;
        const receivePriceInUSD =
          currency === "INR"
            ? receiveObj.current_price / usdToInrRate
            : receiveObj.current_price;
        const calculatedAmount =
          (payAmount * payPriceInUSD) / receivePriceInUSD;
        setReceiveAmount(calculatedAmount.toFixed(6));
        setFeeAmount((calculatedAmount * 0.005).toFixed(6));
      } else {
        console.error("Invalid data for crypto to crypto conversion.");
      }
    }
  };
  return (
    <div className="bg-opacity-90 bg-black h-screen flex flex-col items-center text-white">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
      >
        <source src={liveBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
