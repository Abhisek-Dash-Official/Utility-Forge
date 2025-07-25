"use client";
import style from "./scrollbar.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

const defaultTodos = [
  {
    title: "Initialize Project",
    desc: "Setup project folder, Git repo, and basic file structure.",
  },
  {
    title: "Install Dependencies",
    desc: "Install React, TailwindCSS, and other required packages.",
  },
  {
    title: "Create Components",
    desc: "Build reusable UI components like Header, Footer, Card, Button.",
  },
  {
    title: "Setup Routing",
    desc: "Implement React Router for multi-page navigation.",
  },
  {
    title: "Design Layout",
    desc: "Use Tailwind to design responsive layouts for all screen sizes.",
  },
  {
    title: "Connect Backend (Optional)",
    desc: "Integrate APIs or setup mock data using JSON/server.",
  },
  {
    title: "Add State Management",
    desc: "Use useState or Redux for managing application state.",
  },
  {
    title: "Error Handling",
    desc: "Add proper error messages and fallback UI.",
  },
  {
    title: "Optimize for Performance",
    desc: "Use lazy loading, memoization, and code-splitting.",
  },
  {
    title: "Final Deployment",
    desc: "Deploy the app using Vercel, Netlify, or custom hosting.",
  },
];

export default function DevToDo() {
  const [todos, setTodos] = useState([{ title: "", desc: "" }]);

  useEffect(() => {
    const saved = localStorage.getItem("userTodos");
    setTodos(saved ? JSON.parse(saved) : defaultTodos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value.trim();
    const desc = e.target[1].value.trim();
    if (!title || !desc) return;
    setTodos([...todos, { title, desc }]);
    localStorage.setItem(
      "userTodos",
      JSON.stringify([...todos, { title, desc }])
    );
    e.target.reset(); // clear the form
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    localStorage.setItem("userTodos", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.setItem("userTodos", JSON.stringify([]));
  };

  const handelRestoreDefaultTodos = () => {
    setTodos(defaultTodos);
    localStorage.setItem("userTodos", JSON.stringify(defaultTodos));
  };

  return (
    <>
      <h1 className="flex flex-row items-center justify-center">
        <svg
          className="w-10 h-10 mr-2 text-purple-500"
          fill="white"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
          <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
        <span className="text-purple-500 text-center my-8 text-3xl font-bold">
          Your Tasks, Your Control
        </span>
      </h1>

      <section className="flex flex-wrap md:flex-nowrap justify-center items-center bg-gradient-to-br from-[#1a0033] to-[#0a001a] text-gray-300 px-4 py-12">
        <div className="md:w-1/2 w-full flex justify-center md:justify-end mb-8 md:mb-0">
          <Image
            className="rounded-lg max-w-[400px] w-full h-auto object-cover"
            src="/assets/images/Todo.svg"
            width={400}
            height={400}
            alt="Todo Illustration"
          />
        </div>

        <div className="md:w-1/2 w-full">
          <div
            className={`${style.scrollArea} max-w-xl mx-auto space-y-6 h-[400px] overflow-y-auto pr-2`}
          >
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">
                🎉 No todos left! Chill 😎
              </p>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between bg-[#2b2b2b] p-4 rounded-xl shadow-md"
                >
                  <div>
                    <h2 className="font-semibold text-gray-100 tracking-wide mb-1">
                      {todo.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{todo.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-4 text-red-500 hover:text-red-600 font-bold text-3xl"
                  >
                    <MdRemoveCircleOutline />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center items-center flex-row gap-4">
            {todos.length > 0 && (
              <div className="text-center mt-4">
                <button
                  onClick={handleClearAll}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Clear All
                </button>
              </div>
            )}
            <div className="text-center mt-4">
              <button
                onClick={handelRestoreDefaultTodos}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Restore Default Todos
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-xl mx-auto bg-[#1f1f1f] p-6 rounded-2xl shadow-lg my-6">
        <h2 className="text-2xl font-semibold text-purple-400 text-center mb-4">
          Add Your Todo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}
