/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgblack: "#161617",
      },
      fontFamily: {
        logo: ["Pixelify Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

