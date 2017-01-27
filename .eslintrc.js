var path = require('path')

module.exports = {
  env: {
    es6: true
  },

  parser: 'babel-eslint',

  extends: 'airbnb',

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },

  plugins: [
    'react'
  ],

  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },

  rules: {
    semi: 0,
    'jsx-quotes': 0,
    'no-undef': 0,
    'arrow-body-style': 0,
    'new-cap': 0,
    'no-class-assign': 0,
    'no-underscore-dangle': 0,
    'radix': 0,
    'comma-dangle': ['error', 'only-multiline'],

    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/imports-first': 0,
    'import/prefer-default-export': 0,

    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,

    'jsx-a11y/href-no-hash': 0,
  }
}
