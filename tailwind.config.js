const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    // Your project files here, e.g.,
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Step 1: Add your custom font family name
        lora: ['Lora', ...defaultTheme.fontFamily.serif],
      },
      fontWeight: {
        // Step 2: Explicitly define the weights your font supports
        // This tells Tailwind to generate classes like 'font-500' and 'font-600'
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  // Ensure DaisyUI is included as a plugin
  plugins: [require("daisyui")],
};