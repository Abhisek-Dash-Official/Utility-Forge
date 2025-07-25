import Image from "next/image";
import Link from "next/link";

async function getData() {
  return [
    {
      name: "Age Calculator",
      description: "Find your exact age instantly",
      img: "/assets/icons/age-calculator.png",
    },
    {
      name: "Currency Converter",
      description: "Real-time currency exchange",
      img: "/assets/icons/currency-convertor.png",
    },
    {
      name: "Mathematical Calculator",
      description: "Mathematical and Scientifical operations made easy",
      img: "/assets/icons/mathematical-calculator.png",
    },
    {
      name: "Unit Converter",
      description: "Length, weight, volume & more",
      img: "/assets/icons/unit-convertor.png",
    },
    {
      name: "Password Generator",
      description: "Secure your digital life",
      img: "/assets/icons/password-generator.png",
    },
    {
      name: "Color Picker",
      description: "Pick and convert HEX, RGB, HSL colors",
      img: "/assets/icons/color-picker.png",
    },
    {
      name: "Weather Info",
      description: "Get current weather by city or your location",
      img: "/assets/icons/weather-app.png",
    },
    {
      name: "Multi-Timezone Clock",
      description: "Compare time across multiple countries",
      img: "/assets/icons/multi-clock.png",
    },
    {
      name: "Dev To-Do",
      description:
        "A powerful task manager built for developers with code snippets, dark mode, and tags.",
      img: "/assets/icons/dev-todo.png",
    },
  ];
}

export default async function UtilityForge() {
  const utilities = await getData();
  return (
    <section className="bg-[linear-gradient(to_bottom_right,_#1a0033,_#0a001a)] text-gray-300 font-sans flex justify-start items-center min-h-[calc(100vh-200px)]">
      <div className="container mx-auto">
        <div className="flex flex-wrap -m-4">
          {utilities.map((tool, idx) => (
            <Link
              href={`/${tool.name.toLowerCase().replace(" ", "-")}`}
              key={idx}
              className="block p-4 w-full md:w-1/2 lg:w-1/3"
            >
              <div className="h-full flex items-center bg-[#1f1b2e] hover:bg-[#292040] transition rounded-xl border border-purple-900 p-4 shadow-md">
                <div className="w-16 h-16 bg-gray-800 flex items-center justify-center text-purple-400 text-xl font-bold rounded-full mr-4 overflow-hidden">
                  <Image
                    src={tool.img}
                    width={50}
                    height={50}
                    alt={tool.name}
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    {tool.name}
                  </h2>
                  <p className="text-purple-400">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
