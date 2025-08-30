/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["../../.eslintrc.cjs"],
  root: true,
  rules: {
    "no-console": "off", //TODO: Delete this...
  },
};

module.exports = config;
