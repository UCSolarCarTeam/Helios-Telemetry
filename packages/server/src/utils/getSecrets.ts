import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

/* Update secrets here: https://ca-central-1.console.aws.amazon.com/secretsmanager/listsecrets?region=ca-central-1 */
type SECRETS_SCHEMA = {
  HeliosTelemetryMQTTCredentials: {
    username: string;
    password: string;
  };
  HeliosLapPositionPassword: { LAP_POSITION_PASSWORD: string };
};

const client = new SecretsManagerClient({
  region: "ca-central-1",
});

export async function getSecrets<K extends keyof SECRETS_SCHEMA>(
  secret_name: K,
): Promise<SECRETS_SCHEMA[K]> {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
      }),
    );
    const secret = JSON.parse(response.SecretString!) as SECRETS_SCHEMA[K];
    return secret;
  } catch (error) {
    throw error;
  }
}
