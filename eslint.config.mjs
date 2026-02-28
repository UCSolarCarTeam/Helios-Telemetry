import path from "path";
import { fileURLToPath } from "url";

import prettierPlugin from "eslint-plugin-prettier";
import promisePlugin from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import sortKeys from "eslint-plugin-sort-keys";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";

import prettierConfig from "./.prettierrc.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // ========================
  // Global ignores
  // ========================
  {
    ignores: [
      "**/node_modules/**",
      "packages/db/src/entities/*.ts",
      "packages/client/tailwind.config.ts",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
    ],
  },

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"], // We use TS config only for TS files
  })),

  // ========================
  // Base TypeScript rules (ALL packages)
  // ========================
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
      promise: promisePlugin,
      "sort-keys": sortKeys,
      "sort-destructure-keys": sortDestructureKeys,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      eqeqeq: ["error", "smart"],
      "no-console": "error",
      "no-eval": "error",
      "no-var": "error",

      "prettier/prettier": ["error", prettierConfig],

      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-keys/sort-keys-fix": "error",
    },
  },

  // ========================
  // CLIENT (Next.js + React)
  // ========================
  {
    files: ["packages/client/**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
      next: {
        rootDir: "packages/client",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,

      "react/jsx-sort-props": "error",
      "react/sort-comp": "off",
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": ["error", "packages/client/src"],
    },
  },

  // ========================
  // SERVER (Node only)
  // ========================
  {
    files: ["packages/server/**/*.ts"],
    rules: {
      // Server-specific overrides go here
      // (currently same as base except no React rules)
    },
  },
];
