module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 'warn',
    'no-use-before-define': 0,
    'max-len': [2, 100, 2],
  },
};
