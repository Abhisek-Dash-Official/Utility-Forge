# Utility Forge (PreCollege Repo)

**Utility Forge** is a collection of essential, no-nonsense tools — from calculators to converters — designed with simplicity and speed in mind. No ads, no distractions, just pure utility.

## Features

- **Age Calculator** – Quickly find your exact age
- **Currency Converter** – Real-time exchange rate conversions
- **Mathematical Calculator** – Supports both simple and scientific operations
- **Unit Converter** – Convert length, weight, volume, and more
- **Password Generator** – Secure your digital life with strong passwords
- **Color Picker** – Convert and pick HEX, RGB, HSL values
- **Weather Info** – Fetch current weather by location or city
- **Multi-Timezone Clock** – View analog and digital clocks across major countries
- **Dev To-Do** – Manage tasks with tags, dark mode, and snippet support

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Utilities**: Moment-Timezone, OpenWeather API (or any applicable APIs)

## Getting Started

```
npm install
npm run dev
```

### Folder Structure

```
utility-forge/
│
├── public/
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│   └── app/
│       ├── components/                 # Reusable Header/Footer
│       ├── age-calculator/             # Age calculator tool
│       ├── color-picker/               # Color picker tool
│       ├── currency-convertor/         # Currency conversion tool
│       ├── dev-to-do/                  # Developer task manager
│       ├── mathematical-calculator/    # Standard calculator
│       ├── multi-time-zone-clock/      # Clock supporting time zones
│       ├── password-generator/         # Secure password creator
│       ├── unit-convertor/             # Unit conversion tool
│       ├── weather-info/               # Real-time weather viewer
│       ├── global.css
│       ├── layout.js
│       ├── not-found.js
│       └── page.js
│
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── README.md
```
