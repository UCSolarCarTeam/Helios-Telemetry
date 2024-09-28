import { defineFunction } from "@aws-amplify/backend";

export const RenewCertificate = defineFunction({
  entry: "./handler.ts",
  runtime: 20,
  name: "RenewCertificate",
  timeoutSeconds: 60,
});
