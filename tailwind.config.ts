import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        jeevika: {
          blue: "#0066FF",
          royal: "#1565D8",
          navy: "#0F2547",
          sky: "#EBF4FF",
          mint: "#E8F8F2",
          green: "#10B981",
          forest: "#0D7A52",
          orange: "#F59E0B",
          warm: "#FEF6E6",
          purple: "#6D28D9",
          lavender: "#F3E8FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 37, 71, 0.06), 0 2px 6px -1px rgba(15, 37, 71, 0.04)",
        card: "0 2px 12px -1px rgba(21, 101, 216, 0.06), 0 1px 3px 0 rgba(15, 37, 71, 0.04)",
        glow: "0 0 0 4px rgba(0, 102, 255, 0.14)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
