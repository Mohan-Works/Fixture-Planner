/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          650: '#3f4e65',
          750: '#293548',
          850: '#172033',
        },
        tournax: {
          blue: '#2563eb',
          amber: '#f59e0b',
          gold: '#eab308',
        }
      }
    },
  },
  plugins: [],
}
