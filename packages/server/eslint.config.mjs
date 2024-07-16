// eslint-disable-next-line no-restricted-imports
import prettierConfig from "./prettier.config.cjs";

import prettier from "eslint-plugin-prettier";
import promise from "eslint-plugin-promise";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeys from "eslint-plugin-sort-keys";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

// eslint-disable-next-line no-redeclare
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-redeclare
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const project = path.join(__dirname, "tsconfig.json");

export default [
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "eslint:recommended",
  ),
  {
    languageOptions: {
      ecmaVersion: 5,
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project,
      },
      sourceType: "commonjs",
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier,
      promise,
      sortDestructureKeys,
      sortKeys,
      typescriptSortKeys,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      eqeqeq: ["error", "smart"],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-debugger": "error",
      "no-eval": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [".*"],
        },
      ],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "_",
        },
      ],
      "no-var": "error",
      "prettier/prettier": ["error", prettierConfig],
      "sortDestructureKeys/sort-destructure-keys": "error",
      sortKeys: 0,
      "sortKeys/sort-keys-fix": "error",
      "typescriptSortKeys/interface": "error",
      "typescriptSortKeys/string-enum": "error",
    },
  },
  ...compat
    .extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:promise/recommended",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts", "**/*.tsx"],
    })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 5,
      parserOptions: {
        project,
      },
      sourceType: "script",
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
    },
  },
];
