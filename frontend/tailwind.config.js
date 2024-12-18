import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your folder structure
    "./index.html",
  ],
  theme: {
    extend: { colors: {
      customBg: "#FAF9F5", 
      customBg1: "#FFF2F4",
      btnLight: "#DBD084",
      btnDark: "#DBC537",
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(90deg, rgba(118,154,110) 0%, rgba(31,66,32) 100%)',
    },},
  },
  plugins: [daisyui],
}

