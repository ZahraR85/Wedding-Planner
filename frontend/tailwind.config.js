import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: {
      customBg: "#FAF9F5", 
      btnLight: "#DBD084",
      btnDark: "#DBC537",
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(90deg, rgba(118,154,110) 0%, rgba(31,66,32) 100%)',
    },},
  },
  plugins: [daisyui],
}

