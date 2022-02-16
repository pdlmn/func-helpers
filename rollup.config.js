import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/main.js',
      name: 'fh',
    },
    {
      file: 'dist/main.min.js',
      plugins: [terser()]
    },
  ],
}
