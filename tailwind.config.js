/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "sm": "768px",
      "md": "1024px",
      "lg": "1280px"
    },
    extend: {
      borderRadius: {
        default: "240px"
      },
      colors: {
        primary: "#C1FA6B",
        input: "#F4F6FA",
        dgray: "#D0D0D0",
        light: "#F3FEE1",
        ddgray: "#616162",
        error: "#E20010",
        valid: "#00B600",
        stroke: "#D0D0D4",
        signify: "#EBF4F3",
        success: "#00B600",
        warning: "#FE6309",
        inputbg: "#979797"
      }
    }
  },
  plugins: []
}
