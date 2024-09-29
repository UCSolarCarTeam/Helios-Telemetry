import { EventBridgeHandler } from "aws-lambda";
import {
  ChangeResourceRecordSetsCommand,
  Route53Client,
} from "@aws-sdk/client-route-53";

import {
  UpdateSecretCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import acme from "acme-client";

const route53 = new Route53Client({});
const secretsManager = new SecretsManagerClient({});

// @ts-ignore
export const handler: EventBridgeHandler = async (event, context) => {
  /**
   * Example of acme.Client.auto()
   */

  // const fs = require('fs').promises;

  // @ts-ignore
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
  // @ts-ignore
  async function challengeCreateFn(authz, challenge, keyAuthorization) {
    log("Triggered challengeCreateFn()");

    /* http-01 */
    if (challenge.type === "http-01") {
      const filePath = `/var/www/html/.well-known/acme-challenge/${challenge.token}`;
      const fileContents = keyAuthorization;

      log(
        `Creating challenge response for ${authz.identifier.value} at path: ${filePath}`
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
          HostedZoneId: "Z00168143RCUWIOU5XRGV",
          ChangeBatch: {
            Changes: [
              {
                Action: "UPSERT",
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [
                    {
                      Value: recordValue,
                    },
                  ],
                  TTL: 1800,
                  Type: "TXT",
                },
              },
            ],
          },
        })
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

  // @ts-ignore
  async function challengeRemoveFn(authz, challenge, keyAuthorization) {
    log("Triggered challengeRemoveFn()");

    /* http-01 */
    if (challenge.type === "http-01") {
      const filePath = `/var/www/html/.well-known/acme-challenge/${challenge.token}`;

      log(
        `Removing challenge response for ${authz.identifier.value} at path: ${filePath}`
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
          HostedZoneId: "Z00168143RCUWIOU5XRGV",
          ChangeBatch: {
            Changes: [
              {
                Action: "DELETE",
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [
                    {
                      Value: recordValue,
                    },
                  ],
                  TTL: 1800,
                  Type: "TXT",
                },
              },
            ],
          },
        })
      );
    }
  }

  /* Init client */
  const client = new acme.Client({
    directoryUrl: acme.directory.letsencrypt.production,
    accountKey: await acme.crypto.createPrivateKey(),
  });

  /* Create CSR */
  const [key, csr] = await acme.crypto.createCsr({
    altNames: ["aedes.calgarysolarcar.ca"],
  });

  /* Certificate */
  const cert = await client.auto({
    csr,
    email: "software@calgarysolarcar.ca",
    termsOfServiceAgreed: true,
    challengeCreateFn,
    challengeRemoveFn,
    challengePriority: ["dns-01", "http-01"],
  });

  /* Done */
  log(`CSR:\n${csr.toString()}`);
  log(`Private key:\n${key.toString()}`);
  log(`Certificate:\n${cert.toString()}`);

  return await Promise.all([
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: "HeliosTelemetryBackendSSL/PrivateKey",
        SecretString: csr.toString(),
      })
    ),
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: "HeliosTelemetryBackendSSL/Chain",
        SecretString: key.toString(),
      })
    ),
    await secretsManager.send(
      new UpdateSecretCommand({
        SecretId: "HeliosTelemetryBackendSSL/Certificate",
        SecretString: cert.toString(),
      })
    ),
  ]);

  // Request cert from LetsEncrypt
  // Update Route53 with DNS challenge
  // Wait for cert to be issued
  // Update AWS Secrets store with new cert
};
