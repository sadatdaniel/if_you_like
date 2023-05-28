/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        // 'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
        // 'sans-serif': ['League Spartan']
        "spartan": ["League Spartan"],

      },
    },
  },
  plugins: [],
}

