module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   theme: {
    extend: {
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'],
      },
    },
  },
  darkMode: false,
  variants: {
    extend: {},
  },
  plugins: [],
 
}
