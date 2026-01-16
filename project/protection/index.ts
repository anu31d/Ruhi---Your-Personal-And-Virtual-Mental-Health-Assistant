/**
 * Main Protection Layer
 * This module validates the application's integrity and authorization
 */

import { validateEnvironment } from './validators/environment';
import { validateFingerprint } from './validators/fingerprint';
import { validateLicense } from './validators/license';
import { obfuscate } from './utils/obfuscator';

class ProtectionManager {
  private static instance: ProtectionManager;
  private validated: boolean = false;
  private checksum: string = '';

  private constructor() {
    this.checksum = this.generateChecksum();
  }

  static getInstance(): ProtectionManager {
    if (!ProtectionManager.instance) {
      ProtectionManager.instance = new ProtectionManager();
    }
    return ProtectionManager.instance;
  }

  private generateChecksum(): string {
    const data = `${process.env.NEXT_PUBLIC_APP_ID || 'ruhi-mental-health'}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return obfuscate(Math.abs(hash).toString(36));
  }

  async validate(): Promise<boolean> {
    if (this.validated) return true;

    try {
      // Multi-layer validation
      const envValid = validateEnvironment();
      const fingerprintValid = await validateFingerprint();
      const licenseValid = await validateLicense();

      this.validated = envValid && fingerprintValid && licenseValid;
      
      if (!this.validated) {
        this.handleValidationFailure();
      }

      return this.validated;
    } catch (error) {
      this.handleValidationFailure();
      return false;
    }
  }

  private handleValidationFailure(): void {
    // Soft failure - degrades functionality but doesn't completely break
    if (typeof window !== 'undefined') {
      console.warn('Application validation incomplete');
    }
  }

  isValidated(): boolean {
    return this.validated;
  }

  getChecksum(): string {
    return this.checksum;
  }
}

export const protectionManager = ProtectionManager.getInstance();
export { validateEnvironment, validateFingerprint, validateLicense };
