import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#161e24',
        primary: '#7e4b71',
        secondary: '#81adcc',
        accent: '#FF80AA',
        muted: '#c6c4c0',
        surface: '#fbfaf8',
      },
    },
  },
  plugins: [],
}

export default config 