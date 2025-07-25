"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbArrowsExchange2 } from "react-icons/tb";

const currencies = [
  { value: "USD", img: "/assets/images/flags/USD.png" },
  { value: "EUR", img: "/assets/images/flags/EUR.png" },
  { value: "GBP", img: "/assets/images/flags/GBP.png" },
  { value: "INR", img: "/assets/images/flags/INR.png" },
  { value: "JPY", img: "/assets/images/flags/JPY.png" },
  { value: "CNY", img: "/assets/images/flags/CNY.png" },
  { value: "CAD", img: "/assets/images/flags/CAD.png" },
  { value: "AUD", img: "/assets/images/flags/AUD.png" },
  { value: "CHF", img: "/assets/images/flags/CHF.png" },
  { value: "AED", img: "/assets/images/flags/AED.png" },
  { value: "SGD", img: "/assets/images/flags/SGD.png" },
  { value: "NZD", img: "/assets/images/flags/NZD.png" },
  { value: "HKD", img: "/assets/images/flags/HKD.png" },
  { value: "SEK", img: "/assets/images/flags/SEK.png" },
  { value: "NOK", img: "/assets/images/flags/NOK.png" },
  { value: "DKK", img: "/assets/images/flags/DKK.png" },
  { value: "ZAR", img: "/assets/images/flags/ZAR.png" },
  { value: "RUB", img: "/assets/images/flags/RUB.png" },
  { value: "BRL", img: "/assets/images/flags/BRL.png" },
  { value: "MXN", img: "/assets/images/flags/MXN.png" },
  { value: "KRW", img: "/assets/images/flags/KRW.png" },
  { value: "THB", img: "/assets/images/flags/THB.png" },
  { value: "MYR", img: "/assets/images/flags/MYR.png" },
  { value: "IDR", img: "/assets/images/flags/IDR.png" },
  { value: "PHP", img: "/assets/images/flags/PHP.png" },
  { value: "PLN", img: "/assets/images/flags/PLN.png" },
  { value: "TRY", img: "/assets/images/flags/TRY.png" },
  { value: "ILS", img: "/assets/images/flags/ILS.png" },
  { value: "SAR", img: "/assets/images/flags/SAR.png" },
  { value: "NGN", img: "/assets/images/flags/NGN.png" }
];
async function convertCurrency(amount, from, to) {
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const rate = data.rates[to.toUpperCase()];
        if (!rate) throw new Error(`Unable to find rate for ${to}`);
        return (amount * rate).toFixed(2);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
      }
    }

// currencies.filter((currency)=>{currency.value === fromCurrency.value})
export default function CurrencyConvertor() {
  const inputAmount = useRef();
  const outputAmount = useRef();

  const [fromCurrency, setFromCurrency] = useState({
    value: "USD",
    img: "/assets/images/flags/USD.png",
  });
  const [toCurrency, setToCurrency] = useState({
    value: "INR",
    img: "/assets/images/flags/INR.png",
  });

  const updateConvertedAmount = async () => {
  const result = await convertCurrency(
    inputAmount.current.value || 0,
    fromCurrency.value,
    toCurrency.value
  );
  if (result !== null) {
    outputAmount.current.innerText = result;
  }
};
  useEffect(() => {
  updateConvertedAmount();
  }, [fromCurrency, toCurrency]);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  return (
    <section className="bg-[linear-gradient(to_bottom_right,_#1a0033,_#0a001a)] text-gray-300 font-sans min-h-[calc(100vh-300px)] flex flex-col justify-start items-center px-4">
      <h1 className="text-purple-500 text-center my-8 text-3xl font-bold">
        Convert Currencies with Ease: Get the Latest Exchange Rates
      </h1>

      <div className="bg-[#1f0c3a] rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center w-full max-w-3xl">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <Image
            src="/assets/icons/currency-convertor.png"
            alt="Currency Convertor"
            width={140}
            height={140}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
          <div>
            <p className="text-sm text-purple-400 font-semibold mb-1 ml-1">From</p>
            <div className="flex items-center justify-between bg-[#2b1450] px-4 py-3 rounded-lg border border-purple-700">
              <div className="flex items-center gap-2">
                <Image src={fromCurrency.img} width={36} height={36} alt="From Flag" />
                <span className="font-medium text-lg">{fromCurrency.value}</span>
                <button onClick={() => setShowFromDropdown(!showFromDropdown)}><IoIosArrowDropdownCircle size={22} /></button>
                {showFromDropdown && (
    <div className="absolute z-50 mt-2 bg-purple-950 rounded-lg shadow-lg p-4 w-64 ">
      <div className="grid grid-cols-3 gap-3 text-white">
        {currencies.map((currency, index) => (
          <div
            onClick={() => {
              setFromCurrency(currency);
              setShowFromDropdown(false);}}
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-purple-800 rounded cursor-pointer transition"
          >
            <Image
              src={currency.img}
              alt={currency.value}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span className="text-sm font-medium">{currency.value}</span>
          </div>
        ))}
      </div>
    </div>
  )}
              </div>
              <input
                ref={inputAmount}
                onChange={updateConvertedAmount}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                className="w-[100px] text-right bg-transparent text-white placeholder:text-purple-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <TbArrowsExchange2 className="rotate-90 text-purple-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-purple-400 font-semibold mb-1 ml-1">To</p>
            <div className="flex items-center justify-between bg-[#2b1450] px-4 py-3 rounded-lg border border-purple-700">
              <div className="flex items-center gap-2">
                <Image src={toCurrency.img} width={36} height={36} alt="To Flag" />
                <span className="font-medium text-lg">{toCurrency.value}</span>
                <button onClick={() => setShowToDropdown(!showToDropdown)}><IoIosArrowDropdownCircle size={22} /></button>
                {showToDropdown&&(<div className="absolute z-50 mt-2 bg-purple-950 rounded-lg shadow-lg p-4 w-64 ">
      <div className="grid grid-cols-3 gap-3 text-white">
        {currencies.map((currency, index) => (
          <div
            onClick={() => {
              setToCurrency(currency);
              setShowToDropdown(false);}}
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-purple-800 rounded cursor-pointer transition"
          >
            <Image
              src={currency.img}
              alt={currency.value}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span className="text-sm font-medium">{currency.value}</span>
          </div>
        ))}
      </div>
    </div>)}
              </div>
              <span
                ref={outputAmount}
                className="w-[100px] text-right text-white font-semibold"
              >
                00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
