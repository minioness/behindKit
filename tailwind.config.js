/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {
      colors: {
        primary: "#E35050", // 포인트 컬러
      },
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"], // 다크모드 안 쓸 거니까 light만!
  },
};

