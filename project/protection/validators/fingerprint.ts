/**
 * Fingerprint Validator
 * Creates and validates browser/environment fingerprints
 */

import { PROTECTION_CONFIG } from '../config';

export async function validateFingerprint(): Promise<boolean> {
  if (!PROTECTION_CONFIG.ENABLE_FINGERPRINT_CHECK) {
    return true;
  }

  if (typeof window === 'undefined') {
    return true; // Server-side, skip fingerprint
  }

  try {
    const currentFingerprint = await generateFingerprint();
    const storedFingerprint = getStoredFingerprint();

    if (!storedFingerprint) {
      // First run, store the fingerprint
      storeFingerprint(currentFingerprint);
      return true;
    }

    // Validate fingerprint consistency
    const isValid = validateFingerprintMatch(currentFingerprint, storedFingerprint);
    
    if (!isValid) {
      console.warn('Fingerprint mismatch detected');
      // Still allow but log
    }

    return true; // Soft validation
  } catch (error) {
    console.error('Fingerprint validation error:', error);
    return true; // Fail open
  }
}

async function generateFingerprint(): Promise<string> {
  const components: string[] = [];

  // Canvas fingerprint
  components.push(getCanvasFingerprint());

  // WebGL fingerprint
  components.push(getWebGLFingerprint());

  // Screen properties
  components.push(
    `${screen.width}x${screen.height}x${screen.colorDepth}`
  );

  // Timezone
  components.push(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // Languages
  components.push(navigator.languages.join(','));

  // Hardware concurrency
  components.push(
    navigator.hardwareConcurrency?.toString() || 'unknown'
  );

  // Platform
  components.push(navigator.platform);

  const fingerprint = components.join('|');
  return hashString(fingerprint);
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas';

    canvas.width = 200;
    canvas.height = 50;

    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Ruhi App', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Fingerprint', 4, 17);

    return canvas.toDataURL().slice(-50);
  } catch {
    return 'canvas-error';
  }
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'no-debug-info';

    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return hashString(renderer);
  } catch {
    return 'webgl-error';
  }
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

function getStoredFingerprint(): string | null {
  try {
    return localStorage.getItem(PROTECTION_CONFIG.FINGERPRINT_KEY);
  } catch {
    return null;
  }
}

function storeFingerprint(fingerprint: string): void {
  try {
    localStorage.setItem(PROTECTION_CONFIG.FINGERPRINT_KEY, fingerprint);
  } catch (error) {
    console.warn('Could not store fingerprint');
  }
}

function validateFingerprintMatch(current: string, stored: string): boolean {
  // Allow some variance
  const similarity = calculateSimilarity(current, stored);
  return similarity > 0.7; // 70% similarity threshold
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
