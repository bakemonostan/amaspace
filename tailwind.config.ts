import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0C2340", light: "#1A3A5C" },
        orange: { DEFAULT: "#E8620A", hover: "#C9540A" },
        blue: { DEFAULT: "#1156CC", light: "#EEF4FF" },
        fire: "#D93025",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(12,35,64,0.08)",
        "card-hover": "0 8px 40px rgba(12,35,64,0.15)",
        nav: "0 2px 12px rgba(12,35,64,0.10)",
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
} satisfies Config;
