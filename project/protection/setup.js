/**
 * Protection Setup Script
 * Initializes the protection system for first-time setup
 * 
 * Run: node protection/setup.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ProtectionSetup {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.protectionDir = __dirname;
  }

  async setup() {
    console.log('🛡️  Ruhi Protection System Setup\n');

    try {
      // Step 1: Generate unique app ID
      console.log('1. Generating unique application ID...');
      const appId = this.generateAppId();
      console.log(`   ✓ App ID: ${appId}\n`);

      // Step 2: Create .env.local if it doesn't exist
      console.log('2. Setting up environment configuration...');
      this.setupEnvFile(appId);
      console.log('   ✓ Environment file configured\n');

      // Step 3: Generate initial license key
      console.log('3. Generating license key (valid for 1 year)...');
      const licenseKey = this.generateInitialLicense();
      console.log('   ✓ License key generated\n');

      // Step 4: Update .gitignore
      console.log('4. Updating .gitignore...');
      this.updateGitignore();
      console.log('   ✓ .gitignore updated\n');

      // Step 5: Create build constants template
      console.log('5. Creating build constants template...');
      this.createBuildConstantsTemplate();
      console.log('   ✓ Build template created\n');

      console.log('✅ Protection system setup complete!\n');
      console.log('Next steps:');
      console.log('  1. Review and update .env.local with your Firebase credentials');
      console.log('  2. Set your production domain in .env.local');
      console.log('  3. Run "npm run protect" to test the protection system');
      console.log('  4. Run "npm run build" to build with protection enabled\n');

      console.log('⚠️  Important:');
      console.log('  - Keep .env.local private and never commit it');
      console.log('  - The protection system will run automatically during builds');
      console.log('  - Review protection/README.md for detailed documentation\n');

    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  generateAppId() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(4).toString('hex');
    return `ruhi-${timestamp}-${random}`;
  }

  setupEnvFile(appId) {
    const envPath = path.join(this.projectRoot, '.env.local');
    
    if (fs.existsSync(envPath)) {
      console.log('   ⚠️  .env.local already exists, updating...');
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Add app ID if not present
      if (!envContent.includes('NEXT_PUBLIC_APP_ID=')) {
        envContent += `\n# Protection System\nNEXT_PUBLIC_APP_ID=${appId}\n`;
        fs.writeFileSync(envPath, envContent);
      }
    } else {
      // Create new .env.local from template
      const templatePath = path.join(this.protectionDir, '.env.template');
      const template = fs.readFileSync(templatePath, 'utf8');
      const newEnv = template.replace('ruhi-your-unique-id', appId);
      fs.writeFileSync(envPath, newEnv);
    }
  }

  generateInitialLicense() {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const license = {
      key: process.env.NEXT_PUBLIC_APP_ID || 'ruhi-app',
      issued: Date.now(),
      expires: expirationDate.getTime(),
      signature: '',
    };

    // Simple signature
    const data = `${license.key}${license.issued}${license.expires}`;
    license.signature = crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);

    const licenseKey = Buffer.from(JSON.stringify(license)).toString('base64');

    // Update .env.local with license key
    const envPath = path.join(this.projectRoot, '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    if (!envContent.includes('NEXT_PUBLIC_LICENSE_KEY=')) {
      envContent += `NEXT_PUBLIC_LICENSE_KEY=${licenseKey}\n`;
      fs.writeFileSync(envPath, envContent);
    }

    return licenseKey;
  }

  updateGitignore() {
    const gitignorePath = path.join(this.projectRoot, '.gitignore');
    
    const protectionIgnores = `
# Protection System
.env.protection
protection/.env.local
protection/build-constants.ts
protection/*.log
`;

    if (fs.existsSync(gitignorePath)) {
      let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      
      if (!gitignoreContent.includes('# Protection System')) {
        gitignoreContent += protectionIgnores;
        fs.writeFileSync(gitignorePath, gitignoreContent);
      }
    } else {
      fs.writeFileSync(gitignorePath, protectionIgnores);
    }
  }

  createBuildConstantsTemplate() {
    const templatePath = path.join(this.protectionDir, 'build-constants.ts');
    
    if (!fs.existsSync(templatePath)) {
      const template = `
/**
 * Build Constants
 * Auto-generated at build time - DO NOT MODIFY
 */

export const BUILD_CONSTANTS = Object.freeze({
  TIMESTAMP: 0,
  HASH: '',
  VERSION: '0.1.0',
  NODE_ENV: 'development',
});
`;
      fs.writeFileSync(templatePath, template.trim());
    }
  }
}

// Run setup
if (require.main === module) {
  const setup = new ProtectionSetup();
  setup.setup().catch(console.error);
}

module.exports = ProtectionSetup;
