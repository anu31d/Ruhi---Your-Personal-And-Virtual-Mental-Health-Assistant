/**
 * Environment Validator
 * Validates that the app is running in an authorized environment
 */

import { PROTECTION_CONFIG } from '../config';

export function validateEnvironment(): boolean {
  try {
    // Check if running in browser
    if (typeof window === 'undefined') {
      return true; // Server-side, always pass
    }

    // Validate domain
    if (PROTECTION_CONFIG.ENABLE_DOMAIN_CHECK) {
      const currentDomain = window.location.hostname;
      const isAllowedDomain = PROTECTION_CONFIG.ALLOWED_DOMAINS.some(
        domain => domain && currentDomain.includes(domain)
      );
      
      if (!isAllowedDomain && process.env.NODE_ENV === 'production') {
        console.warn('Domain validation failed');
        return false;
      }
    }

    // Check for required environment variables
    if (PROTECTION_CONFIG.ENABLE_ENV_CHECK) {
      for (const envVar of PROTECTION_CONFIG.REQUIRED_ENV_VARS) {
        const value = process.env[envVar];
        if (!value || value === 'undefined') {
          console.warn(`Missing required environment variable: ${envVar}`);
          return false;
        }
      }
    }

    // Anti-debugging check
    if (PROTECTION_CONFIG.ANTI_DEBUG && typeof window !== 'undefined') {
      const devtoolsOpen = checkDevTools();
      if (devtoolsOpen) {
        console.warn('Developer tools detected');
        // Don't fail completely, just warn
      }
    }

    return true;
  } catch (error) {
    console.error('Environment validation error:', error);
    return false;
  }
}

function checkDevTools(): boolean {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  
  return widthThreshold || heightThreshold;
}

export function getEnvironmentHash(): string {
  const data = [
    typeof window !== 'undefined' ? window.location.hostname : 'server',
    process.env.NODE_ENV,
    PROTECTION_CONFIG.APP_ID,
  ].join('|');
  
  return hashString(data);
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
