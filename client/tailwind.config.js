/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
      backgroundImage: {
        "auth-background": "url('images/auth-background.jpg')",
      },
    },
  },
  plugins: [],
};
