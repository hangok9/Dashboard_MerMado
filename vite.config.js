import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // El nombre debe coincidir EXACTAMENTE con tu repo de GitHub
  base: '/Dashboard_MerMado/', 
})