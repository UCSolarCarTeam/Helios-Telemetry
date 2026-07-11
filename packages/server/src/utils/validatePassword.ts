const validPassword = process.env.UI_MASTER_PASSWORD;

if (!validPassword) {
  throw new Error("UI_MASTER_PASSWORD environment variable is not configured");
}

/**
 * Password validation utilities for Helios Telemetry
 *
 * Provides centralized password validation logic for secure operations
 * such as driver information updates.
 */

/**
 * Validates a password against the shared master password.
 *
 * Used by sensitive operations. Backed by the UI_MASTER_PASSWORD environment
 * variable.
 *
 * @param password - The password to validate
 * @returns true if the password matches the configured password, false otherwise
 *
 * @example
 * ```typescript
 * if (!validateMasterPassword(req.body.password)) {
 *   return res.status(401).json({ error: "Invalid password" });
 * }
 * ```
 */
export function validateMasterPassword(password: string): boolean {
  return password === validPassword;
}
