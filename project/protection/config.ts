/**
 * Protection Configuration
 * Centralized configuration for all protection mechanisms
 */

export const PROTECTION_CONFIG = {
  // Application Identifier (should be unique to your deployment)
  APP_ID: process.env.NEXT_PUBLIC_APP_ID || 'ruhi-8f3a2c1d',
  
  // Environment validation
  REQUIRED_ENV_VARS: [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  ],
  
  // Allowed domains for production
  ALLOWED_DOMAINS: [
    'localhost',
    '127.0.0.1',
    process.env.NEXT_PUBLIC_DOMAIN || '',
  ],
  
  // Fingerprint validation
  FINGERPRINT_KEY: 'ruhi_app_fp_v1',
  
  // License validation
  LICENSE_KEY: process.env.NEXT_PUBLIC_LICENSE_KEY || '',
  
  // Build timestamp (updated during build)
  BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP || Date.now().toString(),
  
  // Integrity hash (computed during build)
  INTEGRITY_HASH: process.env.INTEGRITY_HASH || '',
  
  // Enable/disable specific protections
  ENABLE_ENV_CHECK: true,
  ENABLE_FINGERPRINT_CHECK: true,
  ENABLE_LICENSE_CHECK: true,
  ENABLE_DOMAIN_CHECK: true,
  
  // Obfuscation settings
  OBFUSCATION_LEVEL: 3,
  
  // Anti-debugging
  ANTI_DEBUG: process.env.NODE_ENV === 'production',
};

// Runtime constants (harder to modify)
export const RUNTIME_CONSTANTS = Object.freeze({
  APP_SIGNATURE: '52756869416970706c6963',
  VERSION_CHECK: 'v1.0.0',
  PROTOCOL_VERSION: 2026,
});
