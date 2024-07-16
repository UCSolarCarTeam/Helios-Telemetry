// /** @type {import("prettier").Config} */
const config = {
  endOfLine: "auto",
  importOrder: [
    "^([^@./].*)$",
    "^@/controllers(.*)$",
    "^@/datasources(.*)$",
    "^@/interfaces(.*)$",
    "^@/routes(.*)$",
    "^@/utils(.*)$",
    "^@(.*)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  semi: true,
  trailingComma: "all",
};

module.exports = config;
