/**
 * Validation utilities for form inputs and data validation.
 * Provides reusable validation functions and a composable hook for form validation.
 */

/**
 * Validation result for a single field
 */
export interface FieldValidationResult {
  /** Whether the field is valid */
  isValid: boolean;
  /** Error message if validation failed */
  errorMessage?: string;
}

/**
 * Validation result for all fields
 */
export interface ValidationResult<T> {
  /** Whether all fields are valid */
  isValid: boolean;
  /** Set of field names that have errors */
  errors: Set<keyof T>;
  /** Map of field names to error messages */
  errorMessages: Partial<Record<keyof T, string>>;
}

/**
 * Validation rule function
 */
export type ValidationRule<T> = (value: T) => FieldValidationResult;

/**
 * Validation schema for a form
 */
export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

// ============================================================================
// Common Validation Rules
// ============================================================================

/**
 * Validates that a string is not empty
 */
export const required = (
  message = "This field is required",
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid = typeof value === "string" && value.trim() !== "";
    return {
      errorMessage: isValid ? undefined : message,
      isValid,
    };
  };
};

/**
 * Validates that a string does not contain digits
 */
export const noDigits = (
  message = "This field should not contain digits",
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid = !/\d/.test(value);
    return {
      errorMessage: isValid ? undefined : message,
      isValid,
    };
  };
};

/**
 * Validates that a string is a valid number
 */
export const isNumeric = (
  message = "This field must be a valid number",
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid =
      typeof value === "string" && value.trim() !== "" && !isNaN(Number(value));
    return {
      errorMessage: isValid ? undefined : message,
      isValid,
    };
  };
};

/**
 * Validates that a string matches a regex pattern
 */
export const pattern = (
  regex: RegExp,
  message = "Invalid format",
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid = regex.test(value);
    return {
      errorMessage: isValid ? undefined : message,
      isValid,
    };
  };
};

/**
 * Validates minimum length
 */
export const minLength = (
  min: number,
  message?: string,
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid = value.length >= min;
    return {
      errorMessage: isValid
        ? undefined
        : message || `Must be at least ${min} characters`,
      isValid,
    };
  };
};

/**
 * Validates maximum length
 */
export const maxLength = (
  max: number,
  message?: string,
): ValidationRule<string> => {
  return (value: string): FieldValidationResult => {
    const isValid = value.length <= max;
    return {
      errorMessage: isValid
        ? undefined
        : message || `Must be at most ${max} characters`,
      isValid,
    };
  };
};

/**
 * Combines multiple validation rules
 */
export const combine = <T>(
  ...rules: ValidationRule<T>[]
): ValidationRule<T> => {
  return (value: T): FieldValidationResult => {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  };
};

// ============================================================================
// Domain-Specific Validation Rules
// ============================================================================

/**
 * Validates driver name (non-empty string without digits)
 */
export const driverName = (): ValidationRule<string> => {
  return combine(
    required("Name must not be empty"),
    noDigits("Name should not contain digits"),
  );
};

/**
 * Validates RFID (non-empty string that represents a valid number)
 */
export const rfid = (): ValidationRule<string> => {
  return combine(
    required("RFID must not be empty"),
    isNumeric("RFID must be a valid number"),
  );
};

// ============================================================================
// Validation Hook
// ============================================================================

/**
 * Validates data against a schema and returns validation results
 *
 * @param data - The data to validate
 * @param schema - The validation schema
 * @returns Validation result with errors and error messages
 *
 * @example
 * ```tsx
 * const schema: ValidationSchema<IDriverNameUpdate> = {
 *   name: [driverName()],
 *   Rfid: [rfid()],
 * };
 *
 * const result = validateData(driverDetails, schema);
 * if (!result.isValid) {
 *   setErrors(result.errors);
 *   setErrorMessages(result.errorMessages);
 * }
 * ```
 */
export function validateData<T>(
  data: T,
  schema: ValidationSchema<T>,
): ValidationResult<T> {
  const errors = new Set<keyof T>();
  const errorMessages: Partial<Record<keyof T, string>> = {};

  for (const field in schema) {
    if (!Object.prototype.hasOwnProperty.call(schema, field)) continue;

    const rules = schema[field];
    if (!rules) continue;

    const value = data[field];

    for (const rule of rules) {
      // Type assertion needed because TypeScript can't infer the relationship
      // between the field type and the rule type
      const result = rule(value as never);
      if (!result.isValid) {
        errors.add(field);
        errorMessages[field] = result.errorMessage;
        break; // Stop at first error for this field
      }
    }
  }

  return {
    errorMessages,
    errors,
    isValid: errors.size === 0,
  };
}
