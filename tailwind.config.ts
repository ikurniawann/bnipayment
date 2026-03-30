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
        bni: {
          primary: "#CC0000",
          dark: "#AA0000",
          light: "#FFEAEA",
        },
        sidebar: "#1C1C1C",
        danger: "#DC2626",
        success: "#16A34A",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;