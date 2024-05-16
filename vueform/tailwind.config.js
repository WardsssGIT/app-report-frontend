import vueformPlugin from '@vueform/vueform/tailwind'
import builderPlugin from '@vueform/builder/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './vueform.config.ts',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
    './node_modules/@vueform/builder/**/*.js',
    './node_modules/@vueform/builder/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    // vueformPlugin,
    // builderPlugin,
    require('@vueform/vueform/tailwind'),
    require('@vueform/builder/tailwind'),    
  ]
}