module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['warn', 'windows'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-namespace': ['off'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        format: ['PascalCase'],
        selector: ['enumMember', 'class', 'interface', 'typeAlias'],
      },
      {
        format: ['PascalCase', 'camelCase'],
        selector: ['function', 'classProperty', 'classMethod', 'typeProperty'],
      },
    ],
  },
};
