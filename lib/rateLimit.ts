// Simple in-memory sliding window rate limiter for Next.js API routes

interface RateLimitStore {
  [ip: string]: number[];
}

const store: RateLimitStore = {};

/**
 * Checks if a given IP has exceeded the allowed number of requests in the window.
 * Default: 5 requests per 60 seconds per IP
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!store[ip]) {
    store[ip] = [];
  }

  // Filter timestamps within the current window
  store[ip] = store[ip].filter((timestamp) => timestamp > windowStart);

  if (store[ip].length >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  // Record current request timestamp
  store[ip].push(now);

  return {
    success: true,
    remaining: limit - store[ip].length,
  };
}
