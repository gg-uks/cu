import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base는 GitHub 레포 이름으로 변경하세요 (예: '/my-repo-name/')
export default defineConfig({
  plugins: [react()],
  base: '/cu/',
})
