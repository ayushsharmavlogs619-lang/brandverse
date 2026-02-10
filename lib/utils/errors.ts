/**
 * Error handling utilities
 * Standardized error responses for API endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { log } from './logger';

/**
 * API error codes
 */
export enum ErrorCode {
    // Authentication errors
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',

    // Validation errors
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    INVALID_INPUT = 'INVALID_INPUT',

    // Resource errors
    NOT_FOUND = 'NOT_FOUND',
    ALREADY_EXISTS = 'ALREADY_EXISTS',

    // Rate limiting
    RATE_LIMITED = 'RATE_LIMITED',

    // Server errors
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

    // Multi-tenancy errors
    INVALID_SUBDOMAIN = 'INVALID_SUBDOMAIN',
    TENANT_MISMATCH = 'TENANT_MISMATCH',
    CLIENT_INACTIVE = 'CLIENT_INACTIVE',
}

/**
 * API error interface
 */
export interface ApiError {
    code: ErrorCode;
    message: string;
    details?: unknown;
}

/**
 * Standard API response interface
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ApiError;
    meta: {
        timestamp: string;
        requestId: string;
    };
}

/**
 * Generate a unique request ID
 */
function generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a success response
 * @param data - Response data
 * @param status - HTTP status code
 * @returns NextResponse
 */
export function successResponse<T>(
    data: T,
    status: number = 200
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                requestId: generateRequestId(),
            },
        },
        { status }
    );
}

/**
 * Create an error response
 * @param code - Error code
 * @param message - User-friendly error message
 * @param status - HTTP status code
 * @param details - Additional error details
 * @returns NextResponse
 */
export function errorResponse(
    code: ErrorCode,
    message: string,
    status: number,
    details?: unknown
): NextResponse<ApiResponse> {
    const requestId = generateRequestId();

    // Log the error
    log.error(`API Error [${requestId}]: ${code} - ${message}`, { code, details });

    return NextResponse.json(
        {
            success: false,
            error: {
                code,
                message,
                details,
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId,
            },
        },
        { status }
    );
}

/**
 * Common error responses
 */
export const errors = {
    unauthorized: (message = 'Authentication required') =>
        errorResponse(ErrorCode.UNAUTHORIZED, message, 401),

    forbidden: (message = 'Access denied') =>
        errorResponse(ErrorCode.FORBIDDEN, message, 403),

    invalidCredentials: () =>
        errorResponse(ErrorCode.INVALID_CREDENTIALS, 'Invalid email or password', 401),

    tokenExpired: () =>
        errorResponse(ErrorCode.TOKEN_EXPIRED, 'Session has expired. Please log in again.', 401),

    notFound: (resource = 'Resource') =>
        errorResponse(ErrorCode.NOT_FOUND, `${resource} not found`, 404),

    validationError: (message: string, details?: unknown) =>
        errorResponse(ErrorCode.VALIDATION_ERROR, message, 400, details),

    invalidInput: (field: string, message: string) =>
        errorResponse(ErrorCode.INVALID_INPUT, message, 400, { field }),

    alreadyExists: (resource: string) =>
        errorResponse(ErrorCode.ALREADY_EXISTS, `${resource} already exists`, 409),

    rateLimited: (retryAfter?: number) =>
        errorResponse(
            ErrorCode.RATE_LIMITED,
            'Too many requests. Please try again later.',
            429,
            retryAfter ? { retryAfter } : undefined
        ),

    internalError: (message = 'An unexpected error occurred') =>
        errorResponse(ErrorCode.INTERNAL_ERROR, message, 500),

    invalidSubdomain: () =>
        errorResponse(ErrorCode.INVALID_SUBDOMAIN, 'Invalid or missing subdomain', 400),

    tenantMismatch: () =>
        errorResponse(ErrorCode.TENANT_MISMATCH, 'You do not have access to this portal', 403),

    clientInactive: () =>
        errorResponse(ErrorCode.CLIENT_INACTIVE, 'This portal is currently inactive', 403),
};

/**
 * Wrap async handler with error catching
 * @param handler - Async request handler
 * @returns Wrapped handler
 */
export function withErrorHandling(
    handler: (request: NextRequest) => Promise<NextResponse>
): (request: NextRequest) => Promise<NextResponse> {
    return async (request: NextRequest) => {
        try {
            return await handler(request);
        } catch (error) {
            console.error('Unhandled API error:', error);

            if (error instanceof Error) {
                return errors.internalError(error.message);
            }

            return errors.internalError();
        }
    };
}
