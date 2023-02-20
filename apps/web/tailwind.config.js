module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./validation/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        md: "960px",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      gridTemplateColumns: {
        courses: "2fr repeat(6, minmax(0, 1fr))",
        students:
          "repeat(4, minmax(0, 1fr)) 0.7fr repeat(2, minmax(0, 0.8fr)) 2fr",
        report: "repeat(6, minmax(0, 1fr))",
        teachers: "repeat(5, minmax(0, 1fr)) 2fr 1fr",
        groups: "2fr repeat(6, minmax(0, 1fr))",
        certificate: "repeat(3, minmax(0, 1fr))",
      },
      fontSize: {
        desk: ".925rem",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
}
