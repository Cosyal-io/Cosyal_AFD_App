import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#C5D82D",
        secondary: "#F15A24",
        tertiary: "#2A9D8F",
        background: "#1E2527",
        "key-lime-pie": {
          DEFAULT: "#C5D82D",
          50: "#F0F5C8",
          100: "#EBF2B7",
          200: "#E2EB94",
          300: "#D8E572",
          400: "#CFDE4F",
          500: "#C5D82D",
          600: "#9DAD20",
          700: "#727D17",
          800: "#474E0F",
          900: "#1C1F06",
          950: "#070701",
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
