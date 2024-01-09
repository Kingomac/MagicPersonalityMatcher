import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        '3-big-center': '1fr 3fr 1fr'
      },
      colors: {
        'azul-claro': '#4cb3ce',
        'azul-claro-hover': '#3e96ad',
        'naranja-200': '#ffdab9',
        'rosa-200': '#ffb6c1',
        'cielo-200': '#b0e0e6',
        'verde-200': '#98fb98',
        'amarillo-200': '#ffffe0',
        'morado-200': '#dda0dd',
        'rojo-200': '#ff6347',
        'azul-200': '#add8e6',

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
      }
    },
  },
  plugins: [],
}
export default config
