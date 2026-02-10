/**
 * Rate limiting using Upstash Redis
 * Prevents brute force attacks on auth endpoints
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limit result interface
 */
export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

/**
 * Check if Upstash is configured
 */
function isUpstashConfigured(): boolean {
    return !!(
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
    );
}

/**
 * Create Redis client (lazy initialization)
 */
let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
    if (!isUpstashConfigured()) {
        return null;
    }

    if (!redisClient) {
        redisClient = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });
    }

    return redisClient;
}

/**
 * Rate limiter for login attempts
 * Default: 5 attempts per 15 minutes per IP
 */
let loginLimiter: Ratelimit | null = null;

function getLoginLimiter(): Ratelimit | null {
    const redis = getRedisClient();
    if (!redis) return null;

    if (!loginLimiter) {
        const limit = Number(process.env.RATE_LIMIT_LOGIN_MAX) || 5;
        const window = process.env.RATE_LIMIT_LOGIN_WINDOW ? `${process.env.RATE_LIMIT_LOGIN_WINDOW} s` : '15 m';

        loginLimiter = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(limit, window as any),
            prefix: 'ratelimit:login',
        });
    }

    return loginLimiter;
}

/**
 * Rate limiter for API requests per user
 * Default: 60 requests per minute
 */
let apiUserLimiter: Ratelimit | null = null;

function getApiUserLimiter(): Ratelimit | null {
    const redis = getRedisClient();
    if (!redis) return null;

    if (!apiUserLimiter) {
        const limit = Number(process.env.RATE_LIMIT_API_MAX) || 60;
        const window = process.env.RATE_LIMIT_API_WINDOW ? `${process.env.RATE_LIMIT_API_WINDOW} s` : '1 m';

        apiUserLimiter = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(limit, window as any),
            prefix: 'ratelimit:api-user',
        });
    }

    return apiUserLimiter;
}

/**
 * Rate limiter for API requests per client
 * Default: 500 requests per minute
 */
let apiClientLimiter: Ratelimit | null = null;

function getApiClientLimiter(): Ratelimit | null {
    const redis = getRedisClient();
    if (!redis) return null;

    if (!apiClientLimiter) {
        // Client limits usually higher or custom configurable
        const limit = Number(process.env.RATE_LIMIT_CLIENT_MAX) || 500;

        apiClientLimiter = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(limit, '1 m'),
            prefix: 'ratelimit:api-client',
        });
    }

    return apiClientLimiter;
}

/**
 * Check login rate limit by IP
 * @param ip - Client IP address
 * @returns Rate limit result
 */
export async function checkLoginRateLimit(
    ip: string
): Promise<RateLimitResult> {
    const limiter = getLoginLimiter();

    // If Upstash not configured, allow all (dev mode)
    if (!limiter) {
        console.warn('Rate limiting disabled: Upstash not configured');
        return { success: true, limit: 999, remaining: 999, reset: 0 };
    }

    const result = await limiter.limit(ip);

    return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
    };
}

/**
 * Check API rate limit by user ID
 * @param userId - User identifier
 * @returns Rate limit result
 */
export async function checkApiUserRateLimit(
    userId: string
): Promise<RateLimitResult> {
    const limiter = getApiUserLimiter();

    if (!limiter) {
        return { success: true, limit: 999, remaining: 999, reset: 0 };
    }

    const result = await limiter.limit(userId);

    return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
    };
}

/**
 * Check API rate limit by client ID
 * @param clientId - Client subdomain
 * @returns Rate limit result
 */
export async function checkApiClientRateLimit(
    clientId: string
): Promise<RateLimitResult> {
    const limiter = getApiClientLimiter();

    if (!limiter) {
        return { success: true, limit: 999, remaining: 999, reset: 0 };
    }

    const result = await limiter.limit(clientId);

    return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
    };
}

/**
 * Get rate limit headers for response
 * @param result - Rate limit result
 * @returns Headers object
 */
export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
    return {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.reset.toString(),
    };
}
