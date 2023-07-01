import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import { swc } from 'rollup-plugin-swc3'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  input: './src/extension.ts',

  output: {
    dir: './build',
    format: 'cjs',
    sourcemap: true,
  },

  plugins: [
    commonjs(),
    resolve(),
    swc({
      sourceMaps: true,
      tsconfig: './tsconfig.json',
    }),
  ],
})
