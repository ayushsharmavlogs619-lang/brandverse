/**
 * SAFE API CLIENT
 * Never crashes due to missing API routes or network errors
 */

interface SafeRequestOptions extends RequestInit {
  fallbackData?: any;
  silent?: boolean;
}

export class SafeApiClient {
  /**
   * Safe fetch that never throws
   * Returns fallback data or null on failure
   */
  static async safeFetch(
    url: string,
    options: SafeRequestOptions = {}
  ): Promise<any> {
    const { fallbackData = null, silent = false, ...fetchOptions } = options;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        if (!silent) {
          console.warn(`API request failed: ${url} - Status: ${response.status}`);
        }
        return fallbackData;
      }

      // Try to parse JSON, return fallback if parsing fails
      try {
        return await response.json();
      } catch (parseError) {
        if (!silent) {
          console.warn(`Failed to parse JSON response from: ${url}`);
        }
        return fallbackData;
      }
    } catch (error) {
      if (!silent) {
        console.warn(`API request error for ${url}:`, error);
      }
      return fallbackData;
    }
  }

  /**
   * Safe POST request
   */
  static async post(
    url: string,
    data: any,
    options: SafeRequestOptions = {}
  ): Promise<any> {
    return this.safeFetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Safe GET request
   */
  static async get(
    url: string,
    options: SafeRequestOptions = {}
  ): Promise<any> {
    return this.safeFetch(url, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Check if an API route exists before calling it
   */
  static async routeExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok || response.status !== 404;
    } catch {
      return false;
    }
  }
}

// Convenience function for common use cases
export const safeApiCall = SafeApiClient.safeFetch.bind(SafeApiClient);