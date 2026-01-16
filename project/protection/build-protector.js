/**
 * Build-time Protection Script
 * Generates fingerprints and hashes during build
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class BuildProtector {
  constructor() {
    this.buildTimestamp = Date.now();
    this.integrityHash = '';
  }

  async protect() {
    console.log('🔒 Applying build protection...');
    
    // Generate integrity hash
    this.integrityHash = await this.generateIntegrityHash();
    
    // Create .env.protection file
    this.createProtectionEnv();
    
    // Inject build constants
    this.injectBuildConstants();
    
    console.log('✅ Build protection applied');
    console.log(`Build ID: ${this.integrityHash.substring(0, 8)}`);
  }

  async generateIntegrityHash() {
    const criticalFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'protection/index.ts',
      'protection/config.ts',
    ];

    const hashes = [];
    for (const file of criticalFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        hashes.push(hash);
      }
    }

    const combined = hashes.join('');
    return crypto.createHash('sha256').update(combined).digest('hex');
  }

  createProtectionEnv() {
    const envContent = `
# Auto-generated protection environment variables
# DO NOT MODIFY - Generated at build time
BUILD_TIMESTAMP=${this.buildTimestamp}
INTEGRITY_HASH=${this.integrityHash}
NEXT_PUBLIC_APP_ID=ruhi-${this.integrityHash.substring(0, 8)}
`;

    const envPath = path.join(process.cwd(), '.env.protection');
    fs.writeFileSync(envPath, envContent.trim());
    console.log('📝 Created .env.protection');
  }

  injectBuildConstants() {
    const constantsPath = path.join(process.cwd(), 'protection', 'build-constants.ts');
    const content = `
/**
 * Build Constants
 * Auto-generated at build time - DO NOT MODIFY
 */

export const BUILD_CONSTANTS = Object.freeze({
  TIMESTAMP: ${this.buildTimestamp},
  HASH: '${this.integrityHash}',
  VERSION: '${require('../package.json').version}',
  NODE_ENV: '${process.env.NODE_ENV}',
});
`;
    
    fs.writeFileSync(constantsPath, content.trim());
    console.log('📝 Created build-constants.ts');
  }
}

// Run if called directly
if (require.main === module) {
  const protector = new BuildProtector();
  protector.protect().catch(console.error);
}

module.exports = BuildProtector;
