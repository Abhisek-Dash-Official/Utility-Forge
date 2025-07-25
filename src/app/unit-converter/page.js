"use client";
import Image from "next/image";
import { useState } from "react";

const unitOptions = {
  length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Inch"],
  weight: ["Gram", "Kilogram", "Pound", "Ounce"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  speed: ["km/h", "m/s", "mph"],
  pressure: ["Pascal", "Bar", "PSI"],
};

export default function UnitConvertor() {
  const [unitType, setUnitType] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const units = unitOptions[unitType] || [];

  const convertUnit = (e) => {
    e.preventDefault();
    const input = parseFloat(value);
    let output = 0;

    if (isNaN(input)) {
      setResult("Invalid input");
      return;
    }

    // Length conversions
    if (unitType === "length") {
      const factors = {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Inch: 0.0254,
      };
      output = (input * factors[fromUnit]) / factors[toUnit];
    }

    // Weight conversions
    else if (unitType === "weight") {
      const factors = {
        Gram: 1,
        Kilogram: 1000,
        Pound: 453.592,
        Ounce: 28.3495,
      };
      output = (input * factors[fromUnit]) / factors[toUnit];
    }

    // Temperature conversions
    else if (unitType === "temperature") {
      const convertTemp = {
        Celsius: {
          Fahrenheit: (c) => c * 1.8 + 32,
          Kelvin: (c) => c + 273.15,
          Celsius: (c) => c,
        },
        Fahrenheit: {
          Celsius: (f) => (f - 32) / 1.8,
          Kelvin: (f) => (f - 32) / 1.8 + 273.15,
          Fahrenheit: (f) => f,
        },
        Kelvin: {
          Celsius: (k) => k - 273.15,
          Fahrenheit: (k) => (k - 273.15) * 1.8 + 32,
          Kelvin: (k) => k,
        },
      };
      output = convertTemp[fromUnit][toUnit](input);
    }

    // Speed conversions
    else if (unitType === "speed") {
      const factors = {
        "km/h": 1,
        "m/s": 3.6,
        mph: 1.60934,
      };
      output = (input * factors[fromUnit]) / factors[toUnit];
    }

    // Pressure conversions
    else if (unitType === "pressure") {
      const factors = {
        Pascal: 1,
        Bar: 100000,
        PSI: 6894.76,
      };
      output = (input * factors[fromUnit]) / factors[toUnit];
    }

    setResult(`${input} ${fromUnit} = ${output.toFixed(2)} ${toUnit}`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-purple-600 text-3xl md:text-4xl font-bold text-center mb-10">
        Make Sense of Measurements: Easy Unit Conversions for Everyone
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-4xl bg-purple-950 shadow-xl rounded-xl p-6">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/icons/unit-convertor.png"
            alt="Unit Converter"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>

        <form
          onSubmit={convertUnit}
          className="w-full md:w-1/2 flex flex-col gap-4"
        >
          {/* Unit Type */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Choose a category:
            </label>
            <select
              value={unitType}
              onChange={(e) => {
                setUnitType(e.target.value);
                setFromUnit("");
                setToUnit("");
              }}
              required
              className="w-full p-2 border-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-900 text-gray-300"
            >
              <option value="" disabled>
                -- Select a type --
              </option>
              {Object.keys(unitOptions).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* From Unit */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              From:
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              disabled={!unitType}
              className="w-full p-2 border-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-900 text-gray-300"
            >
              <option value="">-- Select unit --</option>
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              To:
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              disabled={!unitType}
              className="w-full p-2 border-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-900 text-gray-300"
            >
              <option value="">-- Select unit --</option>
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Input Value */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Enter Value:
            </label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full p-2 border-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-900 text-gray-300"
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={!unitType || !fromUnit || !toUnit || !value}
            className="w-full bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            Convert
          </button>

          {/* Result */}
          {result && (
            <div className="text-center text-lg font-semibold text-purple-600 mt-4">
              {result}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
