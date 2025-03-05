import type { Config } from "tailwindcss";

export default {
  corePlugins: {
    preflight: false
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        disclaimer: "#FFD2E5",
      },
    },
  },
  plugins: [],
} satisfies Config;
