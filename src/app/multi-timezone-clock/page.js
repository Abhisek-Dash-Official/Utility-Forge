"use client";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const timezones = [
  { label: "India (IST)", value: "Asia/Kolkata" },
  { label: "USA - New York (EST)", value: "America/New_York" },
  { label: "USA - Los Angeles (PST)", value: "America/Los_Angeles" },
  { label: "UK (GMT)", value: "Europe/London" },
  { label: "Germany (CET)", value: "Europe/Berlin" },
  { label: "France (CET)", value: "Europe/Paris" },
  { label: "Japan (JST)", value: "Asia/Tokyo" },
  { label: "China (CST)", value: "Asia/Shanghai" },
  { label: "South Korea (KST)", value: "Asia/Seoul" },
  { label: "Brazil (BRT)", value: "America/Sao_Paulo" },
  { label: "Australia - Sydney (AEST)", value: "Australia/Sydney" },
  { label: "Canada - Toronto (EST)", value: "America/Toronto" },
  { label: "Russia - Moscow (MSK)", value: "Europe/Moscow" },
  { label: "UAE - Dubai (GST)", value: "Asia/Dubai" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "South Africa (SAST)", value: "Africa/Johannesburg" },
  { label: "Mexico (CST)", value: "America/Mexico_City" },
  { label: "Argentina (ART)", value: "America/Argentina/Buenos_Aires" },
  { label: "Turkey (TRT)", value: "Europe/Istanbul" },
  { label: "Indonesia - Jakarta (WIB)", value: "Asia/Jakarta" },
];

export default function TimezoneClock() {
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [time, setTime] = useState(moment.tz(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.tz(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const hourDeg = (time.hours() % 12) * 30 + time.minutes() * 0.5;
  const minuteDeg = time.minutes() * 6;
  const secondDeg = time.seconds() * 6;

  return (
    <div className="flex flex-col items-center py-10 text-gray-300 mb-10">
      <h1 className="text-3xl font-bold mb-6">🕒 Timezone Clock</h1>

      {/* Dropdown */}
      <select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        className="mb-6 p-2 rounded bg-purple-600 text-gray-300 shadow-md"
      >
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>

      {/* Clock UI */}
      <div className="relative w-[220px] h-[220px] bg-purple-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <div className="relative w-[200px] h-[200px] bg-gray-200 rounded-full shadow-inner">
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-700 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

          {/* Clock Numbers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 60) * (Math.PI / 180);
            const radius = 80;
            const x = Math.round(100 + radius * Math.cos(angle));
            const y = Math.round(100 + radius * Math.sin(angle));
            return (
              <div
                key={i}
                className="absolute text-sm font-bold text-gray-800"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {(i + 1) % 12 === 0 ? 12 : (i + 1) % 12}
              </div>
            );
          })}

          {/* Hour Hand */}
          <div
            className="absolute top-[50%] left-[50%] origin-bottom bg-black w-[4px] h-[40px] rounded"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
              transition: "transform 0.5s ease-in-out",
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute top-[50%] left-[50%] origin-bottom bg-blue-800 w-[2px] h-[60px] rounded"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
              transition: "transform 0.3s ease-in-out",
            }}
          />

          {/* Second Hand */}
          <div
            className="absolute top-[50%] left-[50%] origin-bottom bg-red-600 w-[1px] h-[80px] rounded"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
              transition: "transform 0.2s linear",
            }}
          />
        </div>
      </div>

      {/* Digital Time */}
      <p className="mt-6 text-lg font-mono bg-purple-600 text-gray-300 px-4 py-2 rounded shadow-md">
        {time.format("HH:mm:ss")} (
        {timezones.find((tz) => tz.value === timezone)?.label || timezone})
      </p>
    </div>
  );
}
