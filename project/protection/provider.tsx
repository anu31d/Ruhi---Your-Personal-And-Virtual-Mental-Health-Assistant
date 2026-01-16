/**
 * Protection Client Component
 * React component wrapper that applies protection
 */

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { protectionManager } from './index';
import { integrityChecker } from './utils/integrity';
import { installAntiTamperingHooks, detectVirtualEnvironment } from './utils/anti-tampering';

interface ProtectionProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectionProvider({ children, fallback }: ProtectionProviderProps) {
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validate() {
      try {
        // Install anti-tampering hooks
        installAntiTamperingHooks();

        // Detect virtual environment
        const isVirtual = detectVirtualEnvironment();
        if (isVirtual && process.env.NODE_ENV === 'production') {
          console.warn('Virtual environment detected');
        }

        // Run protection validation
        const validated = await protectionManager.validate();
        
        // Run integrity checks
        const integrityValid = await integrityChecker.performChecks();

        setIsValidated(validated && integrityValid);
      } catch (error) {
        console.error('Protection validation failed:', error);
        setIsValidated(false);
      } finally {
        setIsLoading(false);
      }
    }

    validate();
  }, []);

  if (isLoading) {
    return fallback || null;
  }

  // Even if validation fails, we show content (soft protection)
  // This prevents complete breakage while still logging warnings
  return <>{children}</>;
}

export function useProtection() {
  return {
    isValidated: protectionManager.isValidated(),
    checksum: protectionManager.getChecksum(),
  };
}
