import { type Request, type Response } from "express";
import NodeCache from "node-cache";

import { createApplicationLogger } from "@/utils/logger";

import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const CACHE_KEY = {
  LAP_CORRELATION_MATRIX: "lap_correlation_matrix",
  PACKET_CORRELATION_MATRIX: "packet_correlation_matrix",
} as const;

// # AWS Credentials (choose one method - see AWS_LAMBDA_SDK_SETUP.md)
// # Method 1: Environment variables (easiest for development)
// # AWS_ACCESS_KEY_ID=your-access-key-id
// # AWS_SECRET_ACCESS_KEY=your-secret-access-key

// # Method 2: Use ~/.aws/credentials file (recommended for local dev)
// # Method 3: IAM role (automatic on EC2/ECS/Lambda - best for production)

// Extract Lambda function names or ARNs from environment variables
// You can use either function names or full ARNs
// Leave as undefined if not set (validation happens at request time)
const PACKET_CORRELATION_MATRIX_FUNCTION =
  process.env.PACKET_CORRELATION_MATRIX_FUNCTION_NAME;
const LAP_CORRELATION_MATRIX_FUNCTION =
  process.env.LAP_CORRELATION_MATRIX_FUNCTION_NAME;

// AWS Region for Lambda functions
const AWS_REGION = process.env.AWS_REGION ?? "ca-central-1";

// Cache instance with 1-hour TTL
const cache = new NodeCache({
  checkperiod: 600, // Check for expired keys every 10 minutes
  stdTTL: 3600, // 1 hour default TTL
  useClones: false, // Don't clone objects for better performance
});

// Initialize AWS Lambda client
// Credentials are automatically loaded from:
// 1. Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
// 2. IAM role (if running on EC2/ECS/Lambda)
// 3. AWS credentials file (~/.aws/credentials)
const lambdaClient = new LambdaClient({
  maxAttempts: 3, // Automatic retries
  region: AWS_REGION,
});

/**
 * Invoke Lambda function with error handling using AWS SDK
 * @param functionName - Lambda function name or ARN
 * @param logger - Logger instance
 * @returns Parsed JSON response from Lambda
 */
async function invokeLambdaFunction(
  functionName: string,
  logger: ReturnType<typeof createApplicationLogger>,
): Promise<unknown> {
  const startTime = Date.now();
  logger.info(`Invoking Lambda function: ${functionName}`);

  try {
    const command = new InvokeCommand({
      FunctionName: functionName,
      InvocationType: "RequestResponse", // Synchronous invocation
      LogType: "Tail", // Include execution logs in response
    });

    const response = await lambdaClient.send(command);
    const duration = Date.now() - startTime;

    // Check for Lambda function errors
    if (response.FunctionError) {
      const errorPayload = response.Payload
        ? new TextDecoder().decode(response.Payload)
        : "Unknown error";
      throw new Error(
        `Lambda function error: ${response.FunctionError}. Payload: ${errorPayload}`,
      );
    }

    // Parse the response payload
    if (!response.Payload) {
      throw new Error("Lambda function returned empty payload");
    }

    const payloadString = new TextDecoder().decode(response.Payload);
    const lambdaResponse = JSON.parse(payloadString);

    // Lambda functions with Function URLs return a response with statusCode and body
    // The body is a JSON string that needs to be parsed again
    let data: unknown;
    if (lambdaResponse.body) {
      // Parse the body string to get the actual data
      data = JSON.parse(lambdaResponse.body);
    } else {
      // Direct invocation without Function URL wrapper
      data = lambdaResponse;
    }

    logger.info(
      `Lambda invocation successful, duration: ${duration}ms, status: ${response.StatusCode}`,
    );

    // Log execution details if available
    if (response.LogResult) {
      const logs = Buffer.from(response.LogResult, "base64").toString("utf-8");
      logger.debug(`Lambda execution logs: ${logs}`);
    }

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      `Lambda invocation failed after ${duration}ms: ${error instanceof Error ? error.message : String(error)}`,
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

    // Validate Lambda function is configured
    if (!PACKET_CORRELATION_MATRIX_FUNCTION) {
      logger.error(
        "PACKET_CORRELATION_MATRIX_FUNCTION_NAME environment variable is not configured",
      );
      return response.status(503).json({
        error:
          "Lambda function not configured. Please set PACKET_CORRELATION_MATRIX_FUNCTION_NAME environment variable.",
      });
    }

    // Invoke Lambda function
    const data = await invokeLambdaFunction(
      PACKET_CORRELATION_MATRIX_FUNCTION,
      logger,
    );

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

    // Validate Lambda function is configured
    if (!LAP_CORRELATION_MATRIX_FUNCTION) {
      logger.error(
        "LAP_CORRELATION_MATRIX_FUNCTION_NAME environment variable is not configured",
      );
      return response.status(503).json({
        error:
          "Lambda function not configured. Please set LAP_CORRELATION_MATRIX_FUNCTION_NAME environment variable.",
      });
    }

    // Invoke Lambda function
    const data = await invokeLambdaFunction(
      LAP_CORRELATION_MATRIX_FUNCTION,
      logger,
    );

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
