import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/brew-journal-world-map/',  // Adjusted for your GitHub Pages folder
})
