import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // これでLAN内の他端末からアクセス可能に
    port: 5173,       // ポート番号
  },
})