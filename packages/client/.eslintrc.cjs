/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const prettierConfig = require("./prettier.config.cjs");

const project = path.join(__dirname, "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  plugins: ["@typescript-eslint", "prettier", "promise"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    eqeqeq: ["error", "smart"],
    "prettier/prettier": ["error", prettierConfig],
    "no-eval": "error",
    "no-var": "error",
    "no-restricted-imports": ["error", { patterns: [".*"] }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off", // tcss prettier plugin handles this
  },
};

module.exports = config;
