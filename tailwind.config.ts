/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F7", // Apple gray
        foreground: "#1D1D1F",

        primary: "#6F4E37", // Coffee brown
        "primary-soft": "rgba(111, 78, 55, 0.12)",

        muted: "#6E6E73",
        border: "#E5E5EA",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.06)",
        medium: "0 16px 32px rgba(0,0,0,0.1)",
        strong: "0 24px 48px rgba(0,0,0,0.14)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
