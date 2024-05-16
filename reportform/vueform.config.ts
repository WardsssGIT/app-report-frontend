import en from '@vueform/vueform/locales/en'
import theme from '@vueform/vueform/dist/tailwind'
import { defineConfig } from '@vueform/vueform'
import builder from '@vueform/builder/plugin'

export default defineConfig({
  theme,
  locales: { en },
  locale: 'en',
  apiKey: 'eb0i-eh2l-zste-svxa-lvxg',
  plugins: [
    builder,
  ],
})