import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/icons/*.svg',
      svgrOptions: {
        memo: true,
        replaceAttrValues: { '#000000': 'currentColor' },
        svgProps: {
          fill: 'currentColor',
          stroke: 'transparent'
        }
      }
    })
  ],
  base: '/todo-list/',
  server: {
    host: true,
    port: 5173
  }
})
