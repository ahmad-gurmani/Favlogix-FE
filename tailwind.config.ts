import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
} satisfies Config;
