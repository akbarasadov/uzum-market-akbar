import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        basket: resolve(__dirname, 'pages/basket/index.html'),
        favorites: resolve(__dirname, 'pages/favorites/index.html'),
        product: resolve(__dirname, 'pages/product/index.html'),

      },
    },
  },
})