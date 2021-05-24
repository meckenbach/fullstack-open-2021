module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'parserOptions': {
    'ecmaVersion': 12,
    'ecmaFeatures': {
      'jsx': true
    },
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'no-trailing-spaces': [
      'error'
    ]
  }
}
