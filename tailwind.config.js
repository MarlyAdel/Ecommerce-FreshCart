const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {
      colors: {
        "main":"#0aad0a"
      },
      container: {
        center: true,
        padding: {
          Defualt:"1rem",
          sm:"2rem",
          md:"3rem",
          lg:"4rem"
        },
    },
  },
},
  plugins: [
    flowbite.plugin(),

  ],
}

