import axios from "axios";
import { type Request, type Response } from "express";
import https from "https";
import NodeCache from "node-cache";

import { createApplicationLogger } from "@/utils/logger";

const CACHE_KEY = {
  LAP_CORRELATION_MATRIX: "lap_correlation_matrix",
  PACKET_CORRELATION_MATRIX: "packet_correlation_matrix",
} as const;

// Validate and extract environment variables at startup
const PACKET_CORRELATION_MATRIX_URL =
  process.env.GET_PACKET_CORRELATION_MATRIX_URL;
const LAP_CORRELATION_MATRIX_URL = process.env.GET_LAP_CORRELATION_MATRIX_URL;

if (!PACKET_CORRELATION_MATRIX_URL) {
  throw new Error(
    "GET_PACKET_CORRELATION_MATRIX_URL environment variable is not defined",
  );
}
if (!LAP_CORRELATION_MATRIX_URL) {
  throw new Error(
    "GET_LAP_CORRELATION_MATRIX_URL environment variable is not defined",
  );
}

// Cache instance with 1-hour TTL
const cache = new NodeCache({
  checkperiod: 600, // Check for expired keys every 10 minutes
  stdTTL: 3600, // 1 hour default TTL
  useClones: false, // Don't clone objects for better performance
});

// Custom HTTPS agent to handle SSL/TLS certificate validation
// This fixes the "unable to get local issuer certificate" error
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation for AWS Lambda URLs
});

// Create axios instance with custom HTTPS agent for Lambda calls
const lambdaAxios = axios.create({
  httpsAgent,
});

/**
 * Fetch data from Lambda with error handling
 */
async function fetchFromLambda(
  url: string,
  logger: ReturnType<typeof createApplicationLogger>,
): Promise<unknown> {
  const startTime = Date.now();
  logger.info(`ENTRY - ${url}`);
  try {
    const { data } = await lambdaAxios.get(url);
    const duration = Date.now() - startTime;

    logger.info(`Lambda call successful, duration: ${duration}ms`);

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      `Lambda call failed after ${duration}ms: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

/**
 * GET /ml/correlation-matrix/packet
 * Returns packet correlation matrix data (cached or from Lambda)
 */
export const getPacketCorrelationMatrix = async (
  request: Request,
  response: Response,
) => {
  const logger = createApplicationLogger(
    "machineLearning.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  try {
    // Check cache first
    const cachedData = cache.get<unknown>(CACHE_KEY.PACKET_CORRELATION_MATRIX);

    if (cachedData !== undefined) {
      const stats = cache.getStats();
      logger.info(
        `Cache HIT for key: ${CACHE_KEY.PACKET_CORRELATION_MATRIX} (Total hits: ${stats.hits}, Total misses: ${stats.misses})`,
      );
      logger.info(`EXIT - ${request.method} ${request.url} - ${200} (cached)`);
      return response.status(200).json(cachedData);
    }

    // Cache miss
    const stats = cache.getStats();
    logger.info(
      `Cache MISS for key: ${CACHE_KEY.PACKET_CORRELATION_MATRIX} (Total hits: ${stats.hits}, Total misses: ${stats.misses})`,
    );

    // Fetch from Lambda
    const data = await fetchFromLambda(PACKET_CORRELATION_MATRIX_URL, logger);

    // Store in cache
    cache.set(CACHE_KEY.PACKET_CORRELATION_MATRIX, data);

    logger.info(
      `EXIT - ${request.method} ${request.url} - ${200} (from Lambda)`,
    );
    return response.status(200).json(data);
  } catch (error) {
    logger.error(
      `ERROR - ${request.method} ${request.url} - ${error instanceof Error ? error.message : String(error)}`,
    );
    return response.status(503).json({
      error:
        "Service temporarily unavailable. Unable to fetch correlation matrix data.",
    });
  }
};

/**
 * GET /ml/correlation-matrix/lap
 * Returns lap correlation matrix data (cached or from Lambda)
 */
export const getLapCorrelationMatrix = async (
  request: Request,
  response: Response,
) => {
  const logger = createApplicationLogger(
    "machineLearning.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  try {
    // Check cache first
    const cachedData = cache.get<unknown>(CACHE_KEY.LAP_CORRELATION_MATRIX);

    if (cachedData !== undefined) {
      const stats = cache.getStats();
      logger.info(
        `Cache HIT for key: ${CACHE_KEY.LAP_CORRELATION_MATRIX} (Total hits: ${stats.hits}, Total misses: ${stats.misses})`,
      );
      logger.info(`EXIT - ${request.method} ${request.url} - ${200} (cached)`);
      return response.status(200).json(cachedData);
    }

    // Cache miss
    const stats = cache.getStats();
    logger.info(
      `Cache MISS for key: ${CACHE_KEY.LAP_CORRELATION_MATRIX} (Total hits: ${stats.hits}, Total misses: ${stats.misses})`,
    );

    // Fetch from Lambda
    const data = await fetchFromLambda(LAP_CORRELATION_MATRIX_URL, logger);

    // Store in cache
    cache.set(CACHE_KEY.LAP_CORRELATION_MATRIX, data);

    logger.info(
      `EXIT - ${request.method} ${request.url} - ${200} (from Lambda)`,
    );
    return response.status(200).json(data);
  } catch (error) {
    logger.error(
      `ERROR - ${request.method} ${request.url} - ${error instanceof Error ? error.message : String(error)}`,
    );
    return response.status(503).json({
      error:
        "Service temporarily unavailable. Unable to fetch correlation matrix data.",
    });
  }
};

/**
 * POST /ml/invalidate
 * Manually invalidate cache for correlation matrices
 */
export const invalidateCache = async (request: Request, response: Response) => {
  const logger = createApplicationLogger(
    "machineLearning.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  try {
    const { key } = request.body;

    if (key && key !== "all") {
      // Invalidate specific key
      if (!Object.values(CACHE_KEY).includes(key)) {
        logger.warn(`Invalid cache key provided: ${key}`);
        return response.status(400).json({
          error: `Invalid cache key. Valid keys: ${Object.values(CACHE_KEY).join(", ")}, or "all"`,
        });
      }

      const deleted = cache.del(key);
      logger.info(`Cache INVALIDATE for key: ${key}, existed: ${deleted > 0}`);
      logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);
      return response.status(200).json({
        invalidated: deleted > 0,
        key,
        message:
          deleted > 0
            ? `Cache for ${key} invalidated successfully`
            : `No cache found for ${key}`,
      });
    } else {
      // Invalidate all caches
      const keys = cache.keys();
      cache.flushAll();
      logger.info(`Cache INVALIDATE ALL, cleared ${keys.length} entries`);
      logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);
      return response.status(200).json({
        message: "All caches invalidated successfully",
      });
    }
  } catch (error) {
    logger.error(
      `ERROR - ${request.method} ${request.url} - ${error instanceof Error ? error.message : String(error)}`,
    );
    return response.status(500).json({
      error: "Failed to invalidate cache",
    });
  }
};

/**
 * GET /ml/health
 * Health check endpoint with cache statistics
 */
export const getHealthCorrelationMatrix = (
  request: Request,
  response: Response,
) => {
  const logger = createApplicationLogger(
    "machineLearning.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  const stats = cache.getStats();
  const hitRate =
    stats.hits + stats.misses > 0
      ? (stats.hits / (stats.hits + stats.misses)) * 100
      : 0;

  const data = {
    cacheStats: {
      hitRate,
      hits: stats.hits,
      keys: stats.keys,
      ksize: stats.ksize,
      misses: stats.misses,
      vsize: stats.vsize,
    },
    date: new Date(),
    message: "OK",
    uptime: process.uptime() + " seconds",
  };

  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);
  return response.status(200).json(data);
};
