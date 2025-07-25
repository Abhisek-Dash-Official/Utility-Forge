"use client";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

function generatePassword(length = 14, types = []) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let pool = "";
  if (types.includes("UpperCases")) pool += upper;
  if (types.includes("LowerCases")) pool += lower;
  if (types.includes("Numbers")) pool += digits;
  if (types.includes("Symbols")) pool += symbols;

  if (pool.length === 0) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }
  return password;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(14);
  const [password, setPassword] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) {
      alert("Please select at least one checkbox.");
      return;
    }
    const result = generatePassword(length, selectedOptions);
    setPassword(result);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-purple-500 text-center my-8 text-3xl font-bold">
        Secure Your Accounts: Generate Strong, Random Passwords
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <div>
          <Image
            src="/assets/icons/password-generator.png"
            alt="Password Generator Illustration"
            width={400}
            height={400}
          />
        </div>

        <div>
          <h2 className="text-purple-600 text-center my-8 text-2xl font-bold">
            Customize your password
          </h2>

          <div className="flex flex-col items-center">
            <label className="text-purple-400 mb-2">Password Length:</label>
            <div className="flex items-center gap-4 w-full">
              <input
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="border border-purple-600 rounded text-gray-300 p-2 w-16 text-center"
              />
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>
          </div>

          <form onSubmit={handleGenerate} className="mt-4 space-y-2">
            {["UpperCases", "LowerCases", "Numbers", "Symbols"].map((item) => (
              <label key={item} className="block text-gray-200">
                <input
                  type="checkbox"
                  value={item}
                  name="features"
                  checked={selectedOptions.includes(item)}
                  onChange={handleCheckboxChange}
                  className="mr-2 text-purple-600 accent-purple-600"
                />
                {item}
              </label>
            ))}

            <button
              type="submit"
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Generate Password
            </button>
          </form>

          {password && (
            <div className="mt-4 bg-gray-800 text-green-400 p-3 rounded text-center font-mono">
              {password}
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && navigator.clipboard) {
                    navigator.clipboard
                      .writeText(password)
                      .then(() => alert("✅ Password copied to clipboard!"))
                      .catch(() => alert("❌ Copy failed"));
                  } else {
                    alert("❌ Clipboard not available");
                  }
                }}
                className="mt-2 bg-purple-600 text-white px-2 py-2 text-lg rounded-full ml-3 hover:bg-purple-700 transition"
              >
                <MdOutlineContentCopy />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
