import path from 'path'

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  "scripts": {
    "test": "jest",
    "build": "webpack",
    "lint": "standard \"src/**/*.js\"",
    "format": "standard --fix \"src/**/*.js\""
  },
};
