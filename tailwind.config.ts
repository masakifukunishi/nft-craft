import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "base-white": "#F5F5F5",
        "base-black": "#1A1A1A",
        "base-black-light": "#282828",
      },
      spacing: {
        18: "4.5rem",
        68: "17rem",
        118: "28rem",
        140: "35rem",
      },
      height: {
        "70%": "70%",
      },
      border: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
