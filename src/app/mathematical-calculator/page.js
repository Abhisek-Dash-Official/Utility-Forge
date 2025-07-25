"use client";
import { useState } from "react";
import { evaluate, round } from "mathjs";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaDivide } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TbSquareRoot } from "react-icons/tb";
import { LuPi } from "react-icons/lu";

export default function MathematicalCalulator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const handleClick = (value) => {
    if (value === "sqrt") {
      setExpression((prev) => prev + "sqrt(");
    } else if (value === "pow") {
      setExpression((prev) => prev + "^");
    } else if (value === "log") {
      setExpression((prev) => prev + "log10(");
    } else if (value === "ln") {
      setExpression((prev) => prev + "log(");
    } else if (value === "inv") {
      setExpression((prev) => prev + "^-1");
    } else if (value === "%") {
      setExpression((prev) => prev + "*0.01");
    } else if (value === "rad") {
      // mathjs handles trig in rad by default
    } else if (value === "deg") {
      setExpression((prev) => `(${prev}) * pi / 180`);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const clearAll = () => {
    setExpression("");
    setResult("0");
  };

  const deletePrev = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const evalResult = evaluate(expression);
      setResult(round(evalResult, 6).toString());
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <section className="bg-[linear-gradient(to_bottom_right,_#1a0033,_#0a001a)] text-gray-300 font-sans min-h-[calc(100vh-300px)] flex flex-col justify-start items-center px-4">
      <h1 className="text-purple-500 text-center my-8 text-3xl font-bold">
        Unlock Mathematical Power: Your Advanced Scientific Calculator
      </h1>
      <div>
        <div className="bg-purple-950 shadow-2xl w-[248px] font-bold text-xl flex justify-end items-center p-2 rounded-t-2xl">
          {expression || "0"}
        </div>
        <div className="bg-purple-950 shadow-2xl w-[248px] font-bold text-3xl flex justify-end items-center p-2 text-green-400">
          = {result}
        </div>
        <div className="grid grid-cols-5 grid-rows-7 gap-1 bg-purple-950 p-4 rounded-b-2xl">
          {[
            "sin",
            "cos",
            "tan",
            "rad",
            "deg",
            "log",
            "ln",
            "(",
            ")",
            "inv",
            "!",
            "AC",
            "%",
            "del",
            "/",
            "pow",
            "7",
            "8",
            "9",
            "*",
            "sqrt",
            "4",
            "5",
            "6",
            "-",
            "pi",
            "1",
            "2",
            "3",
            "+",
            "e",
            "00",
            "0",
            ".",
            "=",
          ].map((btn, i) => (
            <button
              key={i}
              className="w-10 h-10 text-gray-300 rounded-full bg-purple-900 flex justify-center items-center"
              onClick={() => {
                if (btn === "AC") clearAll();
                else if (btn === "del") deletePrev();
                else if (btn === "=") calculate();
                else if (btn === "pi") handleClick("pi");
                else if (btn === "e") handleClick("e");
                else handleClick(btn);
              }}
            >
              {btn === "del" ? (
                <FaDeleteLeft />
              ) : btn === "/" ? (
                <FaDivide />
              ) : btn === "*" ? (
                <IoMdClose />
              ) : btn === "sqrt" ? (
                <TbSquareRoot />
              ) : btn === "pi" ? (
                <LuPi />
              ) : (
                btn
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
