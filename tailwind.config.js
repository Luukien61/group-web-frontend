/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        primary: "#099309",
        secondary: "#A8CD9F",
        default_red: "#D00223",
        red_default: "#AE1427",
        default_background: "#F8F9FA",
        search_background: "#e6ebf3",
        text_gray: "#b1b2b4",
        default_gray: "#99a2aa",
        secondary_gray: "#EDEEEF",
        default_green: "#099309",
        outer_red: "#F5DEE0",
        inner_red: "#DC3545",
        outer_green: "#DCEEE9",
        inner_green:"#1CBB8C",
        outer_blue: "#E2ECFA",
        inner_blue: "#3B7DDD",
        third_green:"#bdefe1",
        default_blue: "#316FF6",
        secondary_blue: "#A0DEFF",
        blue_other: "#004cff",
        yellow_start: "#ff9f00",
        admin_nav_bar_default: "#222E3C",
        admin_nav_bar_secondary: "#364957",
        admin_nav_bar_third: "#496376",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

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
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        "-1/12": "10%",
        "-1/24": "6%",
      },
    },
  },
};
