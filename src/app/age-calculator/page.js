"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

export default function AgeCalculator() {
  const [userAge, setUserAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const inputRef = useRef(null);

  const calculateAge = (e) => {
    e.preventDefault();
    const userDOB = new Date(inputRef.current.value);
    const today = new Date();
    if (isNaN(userDOB.getTime())) {
      alert("❌ Invalid Date! Please enter a valid date of birth.");
      return;
    }

    let years = today.getFullYear() - userDOB.getFullYear();
    let months = today.getMonth() - userDOB.getMonth();
    let days = today.getDate() - userDOB.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setUserAge({ years, months, days });
  };

  return (
    <section className="bg-[linear-gradient(to_bottom_right,_#1a0033,_#0a001a)] text-gray-300 font-sans min-h-[calc(100vh-300px)] flex flex-col justify-start items-center px-4 py-10">
      <h1 className="text-purple-600 text-center mb-8 text-3xl font-bold">
        Welcome to your Age Calculator
      </h1>

      <div className="flex flex-wrap justify-center items-center w-full max-w-[700px] bg-[#1f0c3a] rounded-lg shadow-lg p-4">
        <div className="w-full md:w-[40%] flex justify-center items-center mb-6 md:mb-0">
          <Image
            src="/assets/icons/age-calculator.png"
            alt="Age Calculator Icon"
            width={120}
            height={120}
          />
        </div>

        <div className="w-full md:w-[60%] flex flex-col justify-center items-center px-4">
          <form
            onSubmit={calculateAge}
            className="flex flex-col items-center justify-center gap-4 w-full"
          >
            <label htmlFor="dob" className="text-sm text-gray-300">
              Select your Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              ref={inputRef}
              className="w-full md:w-3/4 bg-purple-100 text-gray-700 px-3 py-2 rounded-md border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="rounded bg-purple-600 hover:bg-purple-500 p-2 px-6 text-white font-semibold transition-colors duration-300"
            >
              Calculate
            </button>
          </form>

          <div
            id="displayDOB"
            className="text-center mt-6 w-full p-3 bg-purple-950 bg-opacity-40 rounded-md"
          >
            <div className="flex items-center justify-center gap-2 text-xl text-purple-300 font-semibold">
              <FaBirthdayCake />
              Your Age is
            </div>
            <ul className="mt-2 text-gray-100 text-lg space-y-1">
              <li>🎉 Years: {userAge.years}</li>
              <li>📅 Months: {userAge.months}</li>
              <li>🕓 Days: {userAge.days}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
