import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'

// nodejs 的内置模块 用来处理路径相关
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
     "~":path.resolve(__dirname,"src") 
    }
  },
  server:{
    proxy:{
      //字符串简写写法
      //'/foo': 'http://127.0.0.1:5173',
       // 选项写法
       '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [vue(),WindiCSS(),],
})
