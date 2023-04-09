module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json']
  },
  globals: {
    'CommCode': true,
    'CommRequest': true,
    'CommUtil': true,
    'CurSetting': true,
    'CommSavePoint': true,
    'CommErrorLog': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 驼峰规则校验：关闭
    'camelcase': 0,
    // 不允许使用tabs：关闭
    'no-tabs': 0,
    // 缩进，两个空格2
    'indent': ['error', 2],
    // 与eslint搭配使用时，使用typescript提供的相关校验，否则typescript自定义全局变量需要引入
    'no-undef': 'off',
    // 结尾分号
    'semi': [
      2,
      'always',
      {
        omitLastInOneLineBlock: true
      }
    ],
    // 函数括号前要有一个空格
    'space-before-function-paren': [
      2,
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // 块语句内行首行尾是否要有空格
    'padded-blocks': 0,
    // 禁止混用不同的操作符，比如 let foo = a && b < 0 || c > 0 || d + 1 === 0
    'no-mixed-operators': 0,
    // 防止this变量和局部变量混淆
    '@typescript-eslint/no-this-alias': 0
  }
}
