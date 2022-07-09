import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      include: '**/*.{ts,js,tsx}',
    }
  )],
  base: '',
  root: 'src',
  build: {
    outDir: '../dist',
  },
})