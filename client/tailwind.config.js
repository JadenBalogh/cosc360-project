module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom 3 column grid for the header to work with search bar
        'header': 'minmax(5rem, 1fr) minmax(0, 48rem) 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
