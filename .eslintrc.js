module.exports = {
  "extends": ["airbnb-base", "plugin:react-native/all", "plugin:react/recommended"],
  "plugins": [
    "react",
    "react-native"
  ],
  "ecmaFeatures": {
    "jsx": true
  },
  "rules": {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "no-use-before-define": 0,
  }
};