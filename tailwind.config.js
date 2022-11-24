/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#87e3e5",
        
"secondary": "#f0c1ff",
        
"accent": "#bcf259",
        
"neutral": "#261B27",
        
"base-100": "#ffff",
        
"info": "#7390D4",
        
"success": "#20D97D",
        
"warning": "#F2D35A",
        
"error": "#EE7299",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
