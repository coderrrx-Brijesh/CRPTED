export const handleSwap = () => {
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