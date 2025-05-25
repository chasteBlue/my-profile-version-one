module.exports = {
  env: {
    browser: true,
    node: true,  // <-- This line enables Node.js globals
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-typescript']
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',  // or vue2-recommended
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended'
  ]
}
