/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    colors: {
      c_black_1: "#141414",
      c_black_2: "#131313",
      white: "rgba(233, 231, 231, 0.925)",
      black: "black",
      dark_green: "#038c6b",
      transparent: "transparent",
      warn_red: "#D0342C",
      warn_green: "#22c55e",
      light_white_nav: "#000",
      light_white_card: "#FFFFFF",
      card_white: "#FAFAFA",
      dark_green_round: "00221a",
      light_green_round: "01ddaa",
      black_popup: "rgba(0, 0, 0, 0.400)",
      light_grey_lines: "#D8D8D8",
      light_grey_back: "#e5e5e5"
    },
    extend: {
      backgroundImage: {
        radial_login: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);",
        green_warn_circle: "radial-gradient(circle at 50% 50%, #a8f0c2 0%, #7ce9a4 99.4%);",
        red_warn_circle: "radial-gradient(circle at 50% 50%, #D0342C 0%, #f2c2c0 99.4%);"
      },
      boxShadow: {
        card_shadow: "0px 0px 8px -5px rgba(0,0,0,0.48)",
        circle_shadow: "6px 6px 8px #d5e0f3, -6px -6px 8px #FFFFFF;",
        medium_circle: "inset 8px 8px 10px #d5e0f3, inset -4px -4px 8px #FFFFFF;",
        small_circle: "6px 6px 8px #d5e0f3, -2px -2px 8px #FFFFFF;"
      },
      screens: {
        md_cards: {'min': '900px', 'max': '1279px'}
      }
    },
  },
  variants: {
    extend: {}
  },
  plugins: [],
}
