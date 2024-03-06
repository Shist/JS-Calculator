module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: ["warn", 2, { SwitchCase: 1 }],
    "linebreak-style": ["warn", "windows"],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "no-unused-vars": ["warn"],
    "no-undef": ["warn"],
  },
};
