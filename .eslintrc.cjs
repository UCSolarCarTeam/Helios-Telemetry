/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import("eslint").Linter.Config} */

const path = require("path");
const prettierConfig = require(path.join(__dirname, ".prettierrc.cjs"));

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "prettier", "promise"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    eqeqeq: ["error", "smart"],
    "no-eval": "error",
    "no-var": "error",
    "prettier/prettier": ["error", prettierConfig],
    // "no-restricted-imports": ["error", { patterns: [".*"] }],
  },
};

module.exports = config;
