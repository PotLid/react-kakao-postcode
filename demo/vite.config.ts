import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  base: '/react-kakao-postcode/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'react-kakao-postcode', replacement: path.resolve(import.meta.dirname, '../src/index.tsx') },
      // src/index.tsx lives outside this directory, so its bare `import
      // 'react'` would otherwise resolve via the repo root's node_modules
      // instead of this project's — two React copies on one page, which
      // breaks hooks. Force every specifier to this project's copy.
      { find: /^react$/, replacement: path.resolve(import.meta.dirname, 'node_modules/react') },
      { find: /^react\/(.*)$/, replacement: path.resolve(import.meta.dirname, 'node_modules/react/$1') },
      { find: /^react-dom$/, replacement: path.resolve(import.meta.dirname, 'node_modules/react-dom') },
      { find: /^react-dom\/(.*)$/, replacement: path.resolve(import.meta.dirname, 'node_modules/react-dom/$1') },
    ],
  },
  build: {
    outDir: 'dist',
  },
})
