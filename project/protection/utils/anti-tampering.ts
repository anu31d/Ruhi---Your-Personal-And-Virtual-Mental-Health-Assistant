/**
 * Anti-Tampering Hooks
 * Runtime hooks that detect and prevent tampering
 */

import { PROTECTION_CONFIG } from '../config';

export function installAntiTamperingHooks() {
  if (typeof window === 'undefined') return;

  // Prevent context menu in production
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  // Detect keyboard shortcuts for dev tools
  document.addEventListener('keydown', (e) => {
    if (process.env.NODE_ENV === 'production') {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (e.ctrlKey && e.shiftKey && (
        e.keyCode === 73 || // I
        e.keyCode === 74 || // J
        e.keyCode === 67 || // C
        e.keyCode === 85    // U
      )) {
        e.preventDefault();
        return false;
      }
    }
  });

  // Monitor for debugger
  setInterval(() => {
    if (PROTECTION_CONFIG.ANTI_DEBUG) {
      checkDebugger();
    }
  }, 1000);

  // Freeze critical objects
  freezeCriticalObjects();
}

function checkDebugger() {
  const start = performance.now();
  debugger; // This line will be caught by debugger
  const end = performance.now();
  
  // If debugger is open, this will take longer
  if (end - start > 100) {
    console.warn('Debugger detected');
    // Optional: Take action
  }
}

function freezeCriticalObjects() {
  // Freeze important global objects
  try {
    Object.freeze(Object.prototype);
    Object.freeze(Array.prototype);
    Object.freeze(Function.prototype);
  } catch (error) {
    // Already frozen or protected
  }
}

export function detectVirtualEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  const checks = [
    // Check for headless browser
    () => /HeadlessChrome/.test(navigator.userAgent),
    // Check for webdriver
    () => (navigator as any).webdriver === true,
    // Check for automation
    () => (window as any).__nightmare !== undefined,
    // Check for phantom
    () => (window as any).callPhantom !== undefined,
  ];

  return checks.some(check => {
    try {
      return check();
    } catch {
      return false;
    }
  });
}

export function obfuscateStack() {
  // Pollute stack traces to make debugging harder
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = function(error, stack) {
    if (process.env.NODE_ENV === 'production') {
      return stack.map(() => 'at <anonymous>').join('\n');
    }
    return original ? original(error, stack) : error.stack;
  };
}
