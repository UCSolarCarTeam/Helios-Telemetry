/**
 * API Route Constants for Helios Telemetry Client
 *
 * This file defines all API endpoints used in the application in a structured format.
 * Routes are organized by feature/domain for better maintainability.
 *
 * Usage:
 * ```typescript
 * import { API_ROUTES } from '@/constants/apiRoutes';
 * const response = await api.get(API_ROUTES.ml.packetCorrelationMatrix);
 * ```
 */

/**
 * Next.js API Routes (client-side proxies)
 * These routes are handled by Next.js API handlers in /pages/api/
 */
export const API_ROUTES = {
  /**
   * Authentication/Security endpoints
   */
  auth: {
    /** Check MQTT password for driver updates */
    checkMQTTPassword: "/api/checkMQTTPassword",
  },

  /**
   * Health check endpoint
   */
  health: {
    /** Basic health check */
    hello: "/api/hello",
  },

  /**
   * Machine Learning endpoints
   */
  ml: {
    /** Get lap correlation matrix data */
    lapCorrelationMatrix: "/api/getLapCorrelationMatrix",
    /** Get packet correlation matrix data */
    packetCorrelationMatrix: "/api/getPacketCorrelationMatrix",
  },
} as const;

/**
 * Backend API Routes (direct server calls)
 * These routes connect directly to the backend server (prodURL)
 * Used when bypassing Next.js API routes
 */
export const BACKEND_ROUTES = {
  /**
   * Driver endpoints
   */
  drivers: {
    /** Get all drivers */
    base: "/drivers",
    /** Get driver by RFID */
    byRfid: (rfid: string) => `/driver/${rfid}`,
    /** Update driver information */
    updateInfo: "/updatedriverinfo",
  },

  /**
   * Lap data endpoints
   */
  laps: {
    /** Get all laps */
    base: "/laps",
  },

  /**
   * Machine Learning endpoints (backend)
   */
  ml: {
    /** ML health check */
    health: "/ml/health",
    /** Invalidate ML cache */
    invalidateCache: "/ml/invalidate",
    /** Get lap correlation matrix */
    lapCorrelationMatrix: "/ml/correlation-matrix/lap",
    /** Get packet correlation matrix */
    packetCorrelationMatrix: "/ml/correlation-matrix/packet",
  },

  /**
   * Playback endpoints
   */
  playback: {
    /** Get packets between time range */
    packetsBetween: "/packetsBetween",
  },
} as const;

/**
 * Type helper to extract route values
 */
export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
export type BackendRoute = (typeof BACKEND_ROUTES)[keyof typeof BACKEND_ROUTES];
