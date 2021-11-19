import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      coms: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      router: path.resolve(__dirname, 'src/router'),
      store: path.resolve(__dirname, 'src/store'),
      utils: path.resolve(__dirname, 'src/utils'),
      api: path.resolve(__dirname, 'src/api'),
      data: path.resolve(__dirname, 'src/data'),
      mixins: path.resolve(__dirname, 'src/mixins')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#1DA57A'
          'primary-color' : '#1890ff'
        },
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'] // 检查的文件
    }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            if (['row', 'col'].includes(name)) {
              return `ant-design-vue/es/${name}/style/index`
            } else {
              return `ant-design-vue/es/${name}/style/index.less`
            }
          }
        }
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.12:10012',
        // target: 'http://192.168.1.144:10012',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
