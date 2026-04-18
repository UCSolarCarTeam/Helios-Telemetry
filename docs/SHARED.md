_last updated March 29th, 2025_

# Shared Folder Documentation

The purpose of the shared folder is to give all other folders in the `packages` folder access to these global functions. Otherwise you would have some pretty tricky imports, or duplicated code. This eliminates both and is very modular and maintainable.

Brian actually did most of this and it's pretty intuitive. He basically made our shared folder into a npm package that we use locally and import, so look through the files. It is actually pretty self explanatory, but I can give a brief overview of the contents and how it works.

### What is in the shared folder

In the `src` folder, these are the main types, DTOs, and helper functions that we use across the whole repository.

- Use `src/types.ts` for shared domain/application types such as telemetry shapes that are used throughout the app.
- Use `src/dto/*.ts` for **client ↔ server request/response contracts**.

If the client is calling the server, the payload and response types should come from the shared DTOs so both sides use the exact same contract.

What really matters is how it actually works though.

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

### Creating a shared module

In the package.json, we define what dependencies we have in this npm package, as well as the main file that exports all the functions/types that we need.

If you are adding a new shared helper or type:

1. Create a `.ts` file in `packages/shared/src`.
2. Add the exported types/functions.
3. Re-export it from [packages/shared/index.ts](../packages/shared/index.ts).

If you are adding a new **API contract** between the client and server:

1. Create or update a DTO file in `packages/shared/src/dto/`.
2. Export it from [packages/shared/src/dto/index.ts](../packages/shared/src/dto/index.ts).
3. Import that DTO from `@shared/helios-types` in both the client and server.
4. Type the client request/response and the backend controller/service with that same DTO.

For example:

- client request: `backendApi.get<DriversResponseDTO>(...)`
- client mutation body: `UpdateDriverInfoRequestDTO`
- server response: `Response<DriversResponseDTO>`
- server request body: `Request<..., UpdateDriverInfoRequestDTO>`

Keep the DTO barrel explicit in `src/dto/index.ts` by exporting each DTO module there.

Ensure that you are actually using `export const`, `export function`, `export type`, or `export interface` in the `.ts` file.
