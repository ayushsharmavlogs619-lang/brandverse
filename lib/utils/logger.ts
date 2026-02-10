/**
 * Structured logging utility
 * Consistent log format across the application
 */

/**
 * Log levels
 */
export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

/**
 * Log entry structure
 */
interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, unknown>;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}

/**
 * Check if we should log at this level
 */
function shouldLog(level: LogLevel): boolean {
    const logLevel = process.env.LOG_LEVEL || 'INFO';

    const levels: Record<LogLevel, number> = {
        [LogLevel.DEBUG]: 0,
        [LogLevel.INFO]: 1,
        [LogLevel.WARN]: 2,
        [LogLevel.ERROR]: 3,
    };

    return levels[level] >= levels[logLevel as LogLevel] || false;
}

/**
 * Format log entry as JSON
 */
function formatLogEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
}

/**
 * Create a log entry
 */
function createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
): LogEntry {
    const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
    };

    if (context && Object.keys(context).length > 0) {
        entry.context = context;
    }

    if (error) {
        entry.error = {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }

    return entry;
}

/**
 * Logger object with methods for each level
 */
export const log = {
    /**
     * Debug level log
     * @param message - Log message
     * @param context - Additional context
     */
    debug(message: string, context?: Record<string, unknown>): void {
        if (!shouldLog(LogLevel.DEBUG)) return;
        const entry = createLogEntry(LogLevel.DEBUG, message, context);
        console.debug(formatLogEntry(entry));
    },

    /**
     * Info level log
     * @param message - Log message
     * @param context - Additional context
     */
    info(message: string, context?: Record<string, unknown>): void {
        if (!shouldLog(LogLevel.INFO)) return;
        const entry = createLogEntry(LogLevel.INFO, message, context);
        console.info(formatLogEntry(entry));
    },

    /**
     * Warning level log
     * @param message - Log message
     * @param context - Additional context
     */
    warn(message: string, context?: Record<string, unknown>): void {
        if (!shouldLog(LogLevel.WARN)) return;
        const entry = createLogEntry(LogLevel.WARN, message, context);
        console.warn(formatLogEntry(entry));
    },

    /**
     * Error level log
     * @param message - Log message
     * @param context - Additional context
     * @param error - Error object
     */
    error(
        message: string,
        context?: Record<string, unknown>,
        error?: Error
    ): void {
        if (!shouldLog(LogLevel.ERROR)) return;
        const entry = createLogEntry(LogLevel.ERROR, message, context, error);
        console.error(formatLogEntry(entry));
    },

    /**
     * Log an authentication event
     * @param event - Event type
     * @param userId - User ID (if known)
     * @param success - Whether auth succeeded
     * @param details - Additional details
     */
    auth(
        event: 'login' | 'logout' | 'register' | 'token_refresh',
        userId: string | null,
        success: boolean,
        details?: Record<string, unknown>
    ): void {
        const level = success ? LogLevel.INFO : LogLevel.WARN;
        if (!shouldLog(level)) return;

        const entry = createLogEntry(
            level,
            `Auth: ${event} ${success ? 'succeeded' : 'failed'}`,
            { event, userId, success, ...details }
        );

        if (success) {
            console.info(formatLogEntry(entry));
        } else {
            console.warn(formatLogEntry(entry));
        }
    },

    /**
     * Log an API access event
     * @param method - HTTP method
     * @param path - Request path
     * @param userId - User ID
     * @param statusCode - Response status code
     * @param duration - Request duration in ms
     */
    api(
        method: string,
        path: string,
        userId: string | null,
        statusCode: number,
        duration: number
    ): void {
        if (!shouldLog(LogLevel.INFO)) return;

        const entry = createLogEntry(
            statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO,
            `API: ${method} ${path} ${statusCode}`,
            { method, path, userId, statusCode, duration }
        );

        console.info(formatLogEntry(entry));
    },

    /**
     * Log an admin action
     * @param action - Action performed
     * @param adminId - Admin user ID
     * @param targetId - Target resource ID
     * @param details - Additional details
     */
    admin(
        action: string,
        adminId: string,
        targetId: string,
        details?: Record<string, unknown>
    ): void {
        if (!shouldLog(LogLevel.INFO)) return;

        const entry = createLogEntry(
            LogLevel.INFO,
            `Admin: ${action}`,
            { action, adminId, targetId, ...details }
        );

        console.info(formatLogEntry(entry));
    },
};

export default log;
