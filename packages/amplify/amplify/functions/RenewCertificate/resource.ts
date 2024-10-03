import { defineFunction } from "@aws-amplify/backend";

export const RenewCertificate = defineFunction({
  entry: "./handler.ts",
  name: "RenewCertificate",
  runtime: 20,
  timeoutSeconds: 60,
});
