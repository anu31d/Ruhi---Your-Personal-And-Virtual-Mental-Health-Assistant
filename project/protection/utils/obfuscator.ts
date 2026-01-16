/**
 * Code Obfuscator Utility
 * Makes code analysis more difficult
 */

export function obfuscate(input: string): string {
  const encoded = Buffer.from(input).toString('base64');
  return rot13(encoded);
}

export function deobfuscate(input: string): string {
  const decoded = rot13(input);
  return Buffer.from(decoded, 'base64').toString();
}

function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + ((char.charCodeAt(0) - start + 13) % 26));
  });
}

export function scrambleCode(code: string): string {
  // Simple string scrambling
  const chars = code.split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

export function createTrap(): void {
  // Anti-debugging trap
  if (typeof window !== 'undefined') {
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        // Detected debugging attempt
        window.location.href = 'about:blank';
        return '';
      }
    });
    console.log(element);
  }
}
