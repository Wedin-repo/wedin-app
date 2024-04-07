/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryTitleColor: '#464646',
        secondaryTitleColor: '#1C1C1C',
        primaryTextColor: '#1A1A1A',
        secondaryTextColor: '#595959',
        tertiaryTextColor: '#696969',
        primaryBackgroundColor: '#444444',
        secondaryBackgroundColor: '#E7E7E7',
        borderColor: '#E0E0E0',
        secondaryBorderColor: '#B4B4B4',
      },
      screens: {
        '3xl': '1900px',
      },
    },
  },
  plugins: [],
}