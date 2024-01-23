import preset from './exports/tailwind.preset'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  presets: [preset()],
  content: [
    './index.html',
    './{src,docs}/**/*.{vue,js,ts,jsx,tsx}',
  ],
}
