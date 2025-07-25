"use client";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import Image from "next/image";

export default function ColorPicker() {
  const [color, setColor] = useState("#8b5cf6");

  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(color);
      alert("✅ Color copied to clipboard!");
    } catch {
      alert("❌ Copy failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
      <div className="glass-box w-full max-w-5xl p-8 rounded-2xl shadow-xl border border-purple-700/40">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 text-center mb-10 drop-shadow-lg">
          🎨 Precision Color Picker for Designers & Developers
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* Image Section (original image preserved) */}
          <div className="w-full mb-5 md:mb-0 flex justify-center">
            <Image
              src="/assets/icons/color-picker.png"
              alt="Color Picker"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Color Picker Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
            <p className="text-purple-200 text-lg font-mono">
              Picker your color:
            </p>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={`w-24 h-24 rounded-full cursor-pointer transition-all duration-300 shadow-md hover:scale-105`}
            />

            <p className="text-purple-200 text-lg font-mono">Hex: {color}</p>

            <button
              onClick={copyColor}
              className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
            >
              <MdContentCopy size={22} />
              Copy Hex
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-box {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
        }
      `}</style>
    </section>
  );
}
