/**
 * Axios API Client for Helios Telemetry
 *
 * This module provides a configured axios instance for making HTTP requests
 * throughout the application. It includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 * - Type-safe request/response handling
 *
 * Usage:
 * ```typescript
 * import { api } from '@/lib/api';
 * import { API_ROUTES } from '@/constants/apiRoutes';
 *
 * // Simple GET request
 * const response = await api.get(API_ROUTES.ml.packetCorrelationMatrix);
 *
 * // POST request with data
 * const response = await api.post(API_ROUTES.auth.checkMQTTPassword, { password: 'secret' });
 * ```
 */
import axios, { type AxiosInstance } from "axios";

/**
 * Default timeout for all API requests (30 seconds)
 * This prevents requests from hanging indefinitely
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Configured axios instance for client-side API calls
 *
 * Configuration:
 * - baseURL: Empty string (uses relative URLs for Next.js API routes)
 * - timeout: 30 seconds
 * - headers: JSON content type and accept headers
 */
export const api: AxiosInstance = axios.create({
  // Use relative URLs for Next.js API routes
  // For direct backend calls, use the backendApi instance instead
  baseURL: "",

  // Standard JSON headers
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  // 30-second timeout to prevent hanging requests
  timeout: DEFAULT_TIMEOUT,
});

/**
 * Axios instance for direct backend API calls
 *
 * This instance is configured to call the backend server directly,
 * bypassing Next.js API routes. It uses the prodURL from shared types.
 *
 * Note: Import prodURL dynamically to avoid issues with environment variables
 */
const createBackendApi = (): AxiosInstance => {
  // Dynamic import to handle environment-specific URLs
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { prodURL } = require("@shared/helios-types");

  return axios.create({
    baseURL: prodURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: DEFAULT_TIMEOUT,
  });
};

/**
 * Backend API instance (lazy-initialized)
 */
let backendApiInstance: AxiosInstance | null = null;

/**
 * Get the backend API instance (creates it if it doesn't exist)
 */
const getBackendApi = (): AxiosInstance => {
  if (!backendApiInstance) {
    backendApiInstance = createBackendApi();
  }
  return backendApiInstance;
};

/**
 * Export a pre-configured backend API instance for convenience
 */
export const backendApi = getBackendApi();

/**
 * Request interceptor (optional - can be used for logging, auth tokens, etc.)
 */
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here (e.g., auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor (optional - can be used for global error handling)
 */
api.interceptors.response.use(
  (response) => {
    // Any response transformations can go here
    return response;
  },
  (error) => {
    // Global error handling can go here
    // For now, just pass the error through
    return Promise.reject(error);
  },
);

/**
 * Export the default timeout constant for use in other modules
 */
export { DEFAULT_TIMEOUT };
