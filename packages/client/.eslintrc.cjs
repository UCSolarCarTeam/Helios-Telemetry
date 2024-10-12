/** @type {import("eslint").Linter.Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require("./prettier.config.cjs");

const config = {
  extends: ["../../.eslintrc.cjs", "next"],
  root: true,
  rules: {
    "prettier/prettier": ["error", prettierConfig],
    "react/jsx-sort-props": "error",
    "react/sort-comp": 0,
  },
};

module.exports = config;
