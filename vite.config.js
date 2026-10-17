import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages 에 루트 주소로 배포하므로 base 는 '/' 로 둔다.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { outDir: 'dist' },
})
