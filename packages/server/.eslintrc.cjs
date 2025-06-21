/** @type {import("eslint").Linter.Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require("./prettier.config.cjs");

const config = {
  extends: ["../../.eslintrc.cjs"],
  root: true,
  rules: {
    "prettier/prettier": ["error", prettierConfig],
  },
};

module.exports = config;
