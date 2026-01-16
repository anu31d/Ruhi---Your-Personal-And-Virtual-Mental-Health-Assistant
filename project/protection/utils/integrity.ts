/**
 * Integrity Checker
 * Validates runtime integrity and detects tampering
 */

import { PROTECTION_CONFIG, RUNTIME_CONSTANTS } from '../config';

export class IntegrityChecker {
  private checks: Map<string, boolean> = new Map();

  async performChecks(): Promise<boolean> {
    const results = await Promise.all([
      this.checkCodeIntegrity(),
      this.checkConsoleModification(),
      this.checkGlobalScope(),
      this.checkTimestampValidity(),
    ]);

    return results.every(result => result);
  }

  private async checkCodeIntegrity(): Promise<boolean> {
    try {
      // Check if critical functions have been tampered with
      const fetchString = Function.prototype.toString.call(fetch);
      const hasBeenModified = !fetchString.includes('[native code]');
      
      this.checks.set('code_integrity', !hasBeenModified);
      return !hasBeenModified;
    } catch {
      return true; // Fail open
    }
  }

  private async checkConsoleModification(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return true;

      const consoleString = Function.prototype.toString.call(console.log);
      const isModified = !consoleString.includes('[native code]') && 
                        !consoleString.includes('function log()');
      
      this.checks.set('console_integrity', !isModified);
      return !isModified;
    } catch {
      return true;
    }
  }

  private async checkGlobalScope(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return true;

      // Check for suspicious global modifications
      const suspiciousGlobals = [
        '__REACT_DEVTOOLS_GLOBAL_HOOK__',
        '__REDUX_DEVTOOLS_EXTENSION__',
      ];

      const hasSuspicious = suspiciousGlobals.some(
        global => global in window && process.env.NODE_ENV === 'production'
      );

      this.checks.set('global_scope', !hasSuspicious);
      return !hasSuspicious;
    } catch {
      return true;
    }
  }

  private async checkTimestampValidity(): Promise<boolean> {
    try {
      const buildTimestamp = parseInt(PROTECTION_CONFIG.BUILD_TIMESTAMP);
      const now = Date.now();
      
      // Build timestamp shouldn't be in the future
      const isValid = buildTimestamp <= now;
      
      this.checks.set('timestamp_valid', isValid);
      return isValid;
    } catch {
      return true;
    }
  }

  getCheckResults(): Map<string, boolean> {
    return new Map(this.checks);
  }

  generateIntegrityReport(): string {
    const results: string[] = [];
    this.checks.forEach((passed, checkName) => {
      results.push(`${checkName}: ${passed ? '✓' : '✗'}`);
    });
    return results.join('\n');
  }
}

export const integrityChecker = new IntegrityChecker();
