module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'quote-props': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'no-eval': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
