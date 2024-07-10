import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'layout-darkest': '#121212',
        'layout-darker': '#191919',
        'layout-dark': '#1e1e1e',
        'layout-light': '#242424',
        'layout-lighter': '#2d2d2d',
        'layout-lightest': '#3b3b3b',
        'text-lightest': '#ffffff',
        'text-lighter': '#dedede',
        'text-light': '#969696',
        'text-dark': '#878787',
        'text-darker': '#646464',
        'accent': '#f73d0a',
      },
    },
  },
  plugins: [],
} satisfies Config;
