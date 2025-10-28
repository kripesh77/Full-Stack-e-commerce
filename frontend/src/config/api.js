/**
 * API Configuration
 *
 * This file centralizes API URL configuration.
 * In production, set VITE_API_URL environment variable in Sevalla.
 */

// Get API base URL from environment variable or use localhost for development
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Export for convenience
export const API_VERSION = "v1";
export const API_PREFIX = `/api/${API_VERSION}`;

// Full API endpoint
export const API_ENDPOINT = `${API_BASE_URL}${API_PREFIX}`;

// Log configuration in development
if (import.meta.env.DEV) {
  console.log("API Configuration:", {
    baseUrl: API_BASE_URL,
    endpoint: API_ENDPOINT,
    mode: import.meta.env.MODE,
  });
}
