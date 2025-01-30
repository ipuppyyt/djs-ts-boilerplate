const usingCSSVar = (variable) => `var(--${variable})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,scss}",
  ],
  theme: {
    extend: {
      outline: {
        none: ['0', 'transparent'],
      },
      fontFamily: {
        // lexend_black: ["Lexend Black", "sans-serif"],
        // lexend_bold: ["Lexend Bold", "sans-serif"],
        // lexend_extrabold: ["Lexend ExtraBold", "sans-serif"],
        // lexend_extralight: ["Lexend ExtraLight", "sans-serif"],
        // lexend_light: ["Lexend Light", "sans-serif"],
        // lexend_medium: ["Lexend Medium", "sans-serif"],
        // lexend_regular: ["Lexend Regular", "sans-serif"],
        // lexend_semibold: ["Lexend SemiBold", "sans-serif"],
        // lexend_thin: ["Lexend Thin", "sans-serif"],
      },
      colors: {
        primary_bg: usingCSSVar("primary-bg"),
        primary_red: "hex(var(--theme-primary-red))",
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

        // Custom
        primary_bg: usingCSSVar("primary-bg"),
        primary_border: usingCSSVar("primary-border"),
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}