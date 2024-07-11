/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:promise/recommended",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project,
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  plugins: ["@typescript-eslint", "prettier", "promise"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "eslint:recommended",
  ],
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
    "no-unused-vars": ["warn", { argsIgnorePattern: "_" }],
  },
};
