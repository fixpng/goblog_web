import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({mode})=>{
  const env = loadEnv(mode,process.cwd())
  const baseUrl = env.VITE_API
  console.log(env)
  return defineConfig({
  envPrefix:["VITE_"],
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy:{
      "/uploads":{
        target: baseUrl
      }
    }
  }
})
}

// https://vitejs.dev/config/
// 重定向到代理地址

