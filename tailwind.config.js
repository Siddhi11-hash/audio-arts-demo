/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07080a',
        charcoal: '#0f1216',
        navy: '#0d1729',
        violet: '#b34bff',
        blue: '#3f92e8',
        green: '#8cff3d',
        offwhite: '#f4f2ec'
      },
      boxShadow: {
        signal: '0 0 24px -4px rgba(140,255,61,.35)',
        neon: '0 0 24px -2px rgba(179,75,255,.45), 0 0 40px -8px rgba(140,255,61,.3)'
      }
    }
  },
  plugins: []
}
