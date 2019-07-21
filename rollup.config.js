import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';

module.exports = {
  input: 'src/extension.ts',

  output: {
    file: './out/extension.js',
    format: 'cjs',
  },

  external: ['child_process', 'fs', 'path', 'util', 'vscode'],

  plugins: [
    resolve(),
    typescript2({
      clean: true,
      rollupCommonJSResolveHack: true,
    }),
    commonjs(),
  ],
};
