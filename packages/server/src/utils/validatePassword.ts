const validPassword = process.env.MASTER_PASSWORD;

if (!validPassword) {
  throw new Error("MASTER_PASSWORD environment variable is not configured");
}

/**
 * Password validation utilities for Helios Telemetry
 *
 * Provides centralized password validation logic for secure operations
 * such as driver information updates.
 */

/**
 * Validates a frontend action password against the shared master password.
 *
 * Required for sensitive operations like updating driver information in the
 * database. Backed by the MASTER_PASSWORD environment variable.
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
 * Validates the snapshot management password against the shared master password.
 */
export function validateSnapshotPassword(password: string): boolean {
  return password === validPassword;
}
