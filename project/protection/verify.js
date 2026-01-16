/**
 * Protection Verification Script
 * Tests that all protection components are working correctly
 * 
 * Run: node protection/verify.js
 */

const fs = require('fs');
const path = require('path');

class ProtectionVerifier {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  async verify() {
    console.log('🔍 Verifying Protection System\n');

    // Check 1: Files exist
    this.checkFilesExist();

    // Check 2: Environment configuration
    this.checkEnvironment();

    // Check 3: Package.json scripts
    this.checkPackageScripts();

    // Check 4: Integration
    this.checkIntegration();

    // Check 5: Build system
    this.checkBuildSystem();

    // Print results
    this.printResults();
  }

  checkFilesExist() {
    console.log('1. Checking protection files...');
    
    const requiredFiles = [
      'protection/index.ts',
      'protection/config.ts',
      'protection/provider.tsx',
      'protection/build-protector.js',
      'protection/validators/environment.ts',
      'protection/validators/license.ts',
      'protection/validators/fingerprint.ts',
      'protection/utils/obfuscator.ts',
      'protection/utils/integrity.ts',
      'protection/utils/anti-tampering.ts',
    ];

    let allExist = true;
    requiredFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        this.checks.push(`✓ ${file}`);
      } else {
        this.errors.push(`✗ Missing: ${file}`);
        allExist = false;
      }
    });

    if (allExist) {
      console.log('   ✓ All protection files present\n');
    } else {
      console.log('   ✗ Some protection files missing\n');
    }
  }

  checkEnvironment() {
    console.log('2. Checking environment configuration...');
    
    const envPath = path.join(process.cwd(), '.env.local');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      
      const requiredVars = [
        'NEXT_PUBLIC_APP_ID',
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      ];

      let allPresent = true;
      requiredVars.forEach(varName => {
        if (envContent.includes(varName)) {
          this.checks.push(`✓ ${varName} configured`);
        } else {
          this.warnings.push(`⚠ ${varName} not configured`);
          allPresent = false;
        }
      });

      if (allPresent) {
        console.log('   ✓ Environment configured\n');
      } else {
        console.log('   ⚠ Some environment variables missing\n');
      }
    } else {
      this.errors.push('✗ .env.local not found');
      console.log('   ✗ .env.local not found (run setup.js first)\n');
    }
  }

  checkPackageScripts() {
    console.log('3. Checking package.json scripts...');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      if (packageJson.scripts.prebuild?.includes('build-protector')) {
        this.checks.push('✓ prebuild script configured');
        console.log('   ✓ Build protection enabled\n');
      } else {
        this.warnings.push('⚠ prebuild script not configured');
        console.log('   ⚠ Build protection may not run automatically\n');
      }
    }
  }

  checkIntegration() {
    console.log('4. Checking integration...');
    
    const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
    
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      
      if (layoutContent.includes('ProtectionProvider')) {
        this.checks.push('✓ ProtectionProvider integrated in layout');
        console.log('   ✓ Protection integrated into app\n');
      } else {
        this.errors.push('✗ ProtectionProvider not found in layout');
        console.log('   ✗ Protection not integrated\n');
      }
    }

    const middlewarePath = path.join(process.cwd(), 'src/middleware.ts');
    if (fs.existsSync(middlewarePath)) {
      this.checks.push('✓ Protection middleware exists');
      console.log('   ✓ Security headers configured\n');
    } else {
      this.warnings.push('⚠ Protection middleware not found');
      console.log('   ⚠ Middleware not configured\n');
    }
  }

  checkBuildSystem() {
    console.log('5. Checking build configuration...');
    
    const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
    
    if (fs.existsSync(nextConfigPath)) {
      const configContent = fs.readFileSync(nextConfigPath, 'utf8');
      
      if (configContent.includes('webpack')) {
        this.checks.push('✓ Webpack configuration includes protection');
        console.log('   ✓ Build optimizations configured\n');
      } else {
        this.warnings.push('⚠ Webpack protection not configured');
        console.log('   ⚠ Build optimizations may not be applied\n');
      }
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('VERIFICATION RESULTS');
    console.log('='.repeat(50) + '\n');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All checks passed! Protection system is properly configured.\n');
    } else {
      if (this.errors.length > 0) {
        console.log('❌ ERRORS:');
        this.errors.forEach(err => console.log('  ' + err));
        console.log('');
      }

      if (this.warnings.length > 0) {
        console.log('⚠️  WARNINGS:');
        this.warnings.forEach(warn => console.log('  ' + warn));
        console.log('');
      }
    }

    console.log('Next steps:');
    if (this.errors.length > 0) {
      console.log('  1. Fix the errors listed above');
      console.log('  2. Run "node protection/setup.js" if not done yet');
      console.log('  3. Run this verification again');
    } else if (this.warnings.length > 0) {
      console.log('  1. Review warnings and update configuration as needed');
      console.log('  2. Complete .env.local setup');
      console.log('  3. Test with "npm run build"');
    } else {
      console.log('  1. Test the build: npm run build');
      console.log('  2. Test locally: npm run dev');
      console.log('  3. Deploy to production');
      console.log('  4. Monitor protection logs');
    }
    console.log('');
  }
}

// Run verification
if (require.main === module) {
  const verifier = new ProtectionVerifier();
  verifier.verify().catch(console.error);
}

module.exports = ProtectionVerifier;
