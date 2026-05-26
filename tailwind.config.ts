import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#eef6ff", 100: "#d9ebff", 500: "#2563eb", 600: "#1d4ed8", 900: "#0f172a" }
      },
      boxShadow: { soft: "0 18px 50px rgba(15,23,42,.08)" }
    }
  },
  plugins: []
};
export default config;
