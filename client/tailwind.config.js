module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom 3 column grid for the header to work with search bar
        'header': 'minmax(10rem, 1fr) minmax(0, 48rem) minmax(7.5rem, 1fr)',
        'header-md': 'minmax(10rem, 1fr) minmax(7.5rem, 1fr)'
      },
      gridTemplateRows: {
        'header-md': '1fr 1fr'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
