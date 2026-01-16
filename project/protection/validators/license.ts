/**
 * License Validator
 * Validates application license and authorization
 */

import { PROTECTION_CONFIG, RUNTIME_CONSTANTS } from '../config';

interface LicenseData {
  key: string;
  issued: number;
  expires: number;
  signature: string;
}

export async function validateLicense(): Promise<boolean> {
  if (!PROTECTION_CONFIG.ENABLE_LICENSE_CHECK) {
    return true;
  }

  try {
    const licenseKey = PROTECTION_CONFIG.LICENSE_KEY;
    
    // If no license key is set, check for embedded license
    if (!licenseKey) {
      return validateEmbeddedLicense();
    }

    const license = decodeLicense(licenseKey);
    return verifyLicense(license);
  } catch (error) {
    console.warn('License validation failed');
    return false;
  }
}

function validateEmbeddedLicense(): boolean {
  // Embedded license logic (obfuscated)
  const embedded = Buffer.from(RUNTIME_CONSTANTS.APP_SIGNATURE, 'hex').toString();
  const expected = 'RuhiAipplc';
  return embedded.includes(expected.substring(0, 4));
}

function decodeLicense(key: string): LicenseData {
  try {
    const decoded = Buffer.from(key, 'base64').toString();
    return JSON.parse(decoded);
  } catch {
    throw new Error('Invalid license format');
  }
}

function verifyLicense(license: LicenseData): boolean {
  // Check expiration
  const now = Date.now();
  if (license.expires && license.expires < now) {
    console.warn('License expired');
    return false;
  }

  // Verify signature
  const expectedSignature = generateLicenseSignature(
    license.key,
    license.issued,
    license.expires
  );

  if (license.signature !== expectedSignature) {
    console.warn('Invalid license signature');
    return false;
  }

  return true;
}

function generateLicenseSignature(key: string, issued: number, expires: number): string {
  const data = `${key}${issued}${expires}${PROTECTION_CONFIG.APP_ID}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function generateLicenseKey(expirationDate?: Date): string {
  const license: LicenseData = {
    key: PROTECTION_CONFIG.APP_ID,
    issued: Date.now(),
    expires: expirationDate ? expirationDate.getTime() : Date.now() + 365 * 24 * 60 * 60 * 1000,
    signature: '',
  };

  license.signature = generateLicenseSignature(
    license.key,
    license.issued,
    license.expires
  );

  return Buffer.from(JSON.stringify(license)).toString('base64');
}
