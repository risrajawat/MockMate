// Tailwind CSS v4 configuration for the premium redesign
import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Premium palette
        background: "#FAF9F6", // ivory/off‑white
        surface: "#F7F5EF", // beige
        primary: "#6B8E23", // olive
        accent: "#D9822B", // restrained orange
        onBackground: "#222222", // charcoal text
        border: "#E0D9C6",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
      },
      fontFamily: {
        // Inter is already loaded via next/font in layout
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

