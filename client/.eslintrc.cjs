/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "plugin:react/recommended",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off", // tcss prettier plugin handles this
  },
};

module.exports = config;
