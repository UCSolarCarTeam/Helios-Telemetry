import { EventBridgeHandler } from "aws-lambda";
import {
  ChangeResourceRecordSetsCommand,
  Route53Client,
} from "@aws-sdk/client-route-53";

import {
  UpdateSecretCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { ECSClient, UpdateServiceCommand } from "@aws-sdk/client-ecs";

import acme from "acme-client";

const route53 = new Route53Client({});
const secretsManager = new SecretsManagerClient({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const handler: EventBridgeHandler = async (event, context) => {
  /**
   * Example of acme.Client.auto()
   */

  // const fs = require('fs').promises;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  function log(m) {
    process.stdout.write(`${m}\n`);
  }

  /**
   * Function used to satisfy an ACME challenge
   *
   * @param {object} authz Authorization object
   * @param {object} challenge Selected challenge
   * @param {string} keyAuthorization Authorization key
   * @returns {Promise}
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  async function challengeCreateFn(authz, challenge, keyAuthorization) {
    log("Triggered challengeCreateFn()");

    /* http-01 */
    if (challenge.type === "http-01") {
      const filePath = `/var/www/html/.well-known/acme-challenge/${challenge.token}`;
      const fileContents = keyAuthorization;

      log(
        `Creating challenge response for ${authz.identifier.value} at path: ${filePath}`,
      );

      /* Replace this */
      log(`Would write "${fileContents}" to path "${filePath}"`);
      // await fs.writeFile(filePath, fileContents);
    } else if (challenge.type === "dns-01") {
      /* dns-01 */
      const dnsRecord = `_acme-challenge.${authz.identifier.value}`;
      const recordValue = keyAuthorization;

      log(`Creating TXT record for ${authz.identifier.value}: ${dnsRecord}`);

      await route53.send(
        new ChangeResourceRecordSetsCommand({
          ChangeBatch: {
            Changes: [
              {
                Action: "UPSERT",
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [
                    {
                      Value: `"${recordValue}"`,
                    },
                  ],
                  TTL: 1800,
                  Type: "TXT",
                },
              },
            ],
          },
          HostedZoneId: "Z00168143RCUWIOU5XRGV",
        }),
      );
    }
  }

  /**
   * Function used to remove an ACME challenge response
   *
   * @param {object} authz Authorization object
   * @param {object} challenge Selected challenge
   * @param {string} keyAuthorization Authorization key
   * @returns {Promise}
   */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  async function challengeRemoveFn(authz, challenge, keyAuthorization) {
    log("Triggered challengeRemoveFn()");

    /* http-01 */
    if (challenge.type === "http-01") {
      const filePath = `/var/www/html/.well-known/acme-challenge/${challenge.token}`;

      log(
        `Removing challenge response for ${authz.identifier.value} at path: ${filePath}`,
      );

      /* Replace this */
      log(`Would remove file on path "${filePath}"`);
      // await fs.unlink(filePath);
    } else if (challenge.type === "dns-01") {
      /* dns-01 */
      const dnsRecord = `_acme-challenge.${authz.identifier.value}`;
      const recordValue = keyAuthorization;

      log(`Removing TXT record for ${authz.identifier.value}: ${dnsRecord}`);

      await route53.send(
        new ChangeResourceRecordSetsCommand({
          ChangeBatch: {
            Changes: [
              {
                Action: "DELETE",
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [
                    {
                      Value: `"${recordValue}"`,
                    },
                  ],
                  TTL: 1800,
                  Type: "TXT",
                },
              },
            ],
          },
          HostedZoneId: "Z00168143RCUWIOU5XRGV",
        }),
      );
    }
  }

  /* Init client */
  const client = new acme.Client({
    accountKey: await acme.crypto.createPrivateKey(),
    directoryUrl: acme.directory.letsencrypt.production,
  });

  /* Create CSR */
  const [key, csr] = await acme.crypto.createCsr({
    altNames: [process.env.DNS_RECORD as string],
  });

  /* Certificate */
  const cert = await client.auto({
    challengeCreateFn,
    challengePriority: ["dns-01", "http-01"],
    challengeRemoveFn,
    csr,
    email: "software@calgarysolarcar.ca",
    termsOfServiceAgreed: true,
  });

  const splitPemChain = acme.crypto.splitPemChain(cert.toString());

  /* Done */

  await Promise.all([
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: process.env.SECRET_CHAIN_NAME,
        SecretString: splitPemChain[1],
      }),
    ),
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: process.env.SECRET_PRIVKEY_NAME,
        SecretString: key.toString(),
      }),
    ),
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: process.env.SECRET_CERT_NAME,
        SecretString: splitPemChain[0],
      }),
    ),
  ]);

  const ecsclient = new ECSClient();

  return await ecsclient.send(
    new UpdateServiceCommand({
      cluster: process.env.ECS_CLUSTER_NAME,
      desiredCount: 1,
      forceNewDeployment: true,
      service: process.env.ECS_SERVICE_NAME,
    }),
  );

  // Request cert from LetsEncrypt
  // Update Route53 with DNS challenge
  // Wait for cert to be issued
  // Update AWS Secrets store with new cert
};
