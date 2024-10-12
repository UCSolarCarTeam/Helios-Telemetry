/** @type {import("eslint").Linter.Config} */

const prettierConfig = require("./prettier.config.cjs");

const config = {
  extends: ["../../.eslintrc.cjs"],
  root: true,
  rules: {
    "prettier/prettier": ["error", prettierConfig],
  },
};

module.exports = config;
