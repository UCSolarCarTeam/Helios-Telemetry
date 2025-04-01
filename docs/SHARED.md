_last updated March 29th, 2025_

# Shared Folder Documentation

The purpose of the shared folder is to give all other folders in the `packages` folder access to these global functions. Otherwise you would have some pretty tricky imports, or duplicated code. This eliminates both and is very modular and maintainable.

Brian actually did most of this and it's pretty intuitive. He basically made our shared folder into a npm package that we use locally and import, so look through the files. It is actually pretty self explanatory, but I can give a brief overview of the contents and how it works.

### What is in the shared folder

In the `src` folder, these are the main functions that we use in the whole repository. For example, we use the Helios types on both the client and server side, emphasizing the need for global access of these types/functions.

What really matter is how it actually works though.

```package.json
{
  "name": "@shared/helios-types",
  "version": "0.1.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "dependencies": {
    "@aws-sdk/client-secrets-manager": "^3.658.1",
    "fp-ts": "^2.16.9",
    "io-ts": "^2.2.22",
    "typescript": "^5.5.3"
  },
  "devDependencies": {
    "@faker-js/faker": "^9.0.3"
  }
}
```

### Creating a global function

In the package.json, we define what dependencies we have in this npm package, as well as the main file that exports all the functions/types that we need. So, if you plan on adding a shared function that is not currently there, you can follow these steps:

1. Create a `.ts` file and name it in the src folder.
2. Write the functionality for the shared function.
3. Go to the [index.ts](../packages/shared/index.ts) file and export all functions from that file.

Ensure that you are actually using `export const` or `export function` in the `.ts` file.
