import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5e7df",
        dark: "#1f1d1d",
      },
      fontFamily: {
        cabinet: ["CabinetGrotesk-Variable", "CabinetGrotesk-Bold", "sans-serif"],
        satoshi: ["Satoshi-Variable", "Satoshi-Medium", "sans-serif"],
        satoshiItalic: ["Satoshi-VariableItalic", "Satoshi-MediumItalic", "sans-serif"],
      },
      borderRadius: {
        block: "40px",
        card: "15px",
      },
    },
  },
  plugins: [],
};

export default config;
