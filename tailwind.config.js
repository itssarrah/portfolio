module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#FFF5F7',
          100: '#FFE8ED',
          200: '#FFC0CB',
          300: '#FFB7C5',
          400: '#FF9AAF',
          500: '#FF7B95',
          600: '#E8607A',
        },
        blossom: {
          cream: '#FFF8F0',
          lavender: '#E8D5F5',
          purple: '#C9A0DC',
        },
        warm: {
          brown: '#4A3728',
          light: '#6B5445',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
