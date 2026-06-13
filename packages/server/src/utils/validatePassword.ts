const validPassword = process.env.MQTT_PASSWORD;

if (!validPassword) {
  throw new Error("MQTT_PASSWORD environment variable is not configured");
}

/**
 * Password validation utilities for Helios Telemetry
 *
 * Provides centralized password validation logic for secure operations
 * such as driver information updates.
 */

/**
 * Validates the driver update password against the configured environment variable.
 *
 * This password is required for sensitive operations like updating driver information
 * in the database. The password is stored in the MQTT_PASSWORD environment variable.
 *
 * @param password - The password to validate
 * @returns true if the password matches the configured password, false otherwise
 *
 * @example
 * ```typescript
 * if (!validateDriverUpdatePassword(req.body.password)) {
 *   return res.status(401).json({ error: "Invalid password" });
 * }
 * ```
 */
export function validateDriverUpdatePassword(password: string): boolean {
  return password === validPassword;
}

/**
 * Validates the snapshot management password against SNAPSHOT_PASSWORD env var.
 */
export function validateSnapshotPassword(password: string): boolean {
  const snapshotPassword = process.env.SNAPSHOT_PASSWORD;
  if (!snapshotPassword) {
    throw new Error("SNAPSHOT_PASSWORD environment variable is not configured");
  }
  return password === snapshotPassword;
}
