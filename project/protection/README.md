# Protection System

This folder contains the application protection mechanisms designed to make unauthorized forking more difficult.

## Components

### Core Protection (`index.ts`, `config.ts`)
- Central protection manager
- Configuration for all protection mechanisms
- Multi-layer validation system

### Validators (`validators/`)
- **environment.ts**: Validates execution environment and domain
- **license.ts**: License key validation system
- **fingerprint.ts**: Browser/device fingerprinting

### Utilities (`utils/`)
- **obfuscator.ts**: Code obfuscation utilities
- **integrity.ts**: Runtime integrity checking
- **anti-tampering.ts**: Anti-debugging and tampering detection

### Build Tools
- **build-protector.js**: Build-time protection injection
- **provider.tsx**: React component wrapper for protection

## How It Works

1. **Environment Validation**: Checks if running on authorized domains
2. **Fingerprinting**: Creates unique device/browser fingerprints
3. **License Checking**: Validates embedded license keys
4. **Integrity Verification**: Detects code tampering at runtime
5. **Anti-Debugging**: Prevents debugging and inspection

## Setup

### 1. Generate a License Key (Optional)

For production, generate a license key:

\`\`\`typescript
import { generateLicenseKey } from './protection/validators/license';

// Generate key that expires in 1 year
const licenseKey = generateLicenseKey(new Date('2027-01-16'));
console.log('License Key:', licenseKey);
\`\`\`

Add to your `.env.local`:
\`\`\`
NEXT_PUBLIC_LICENSE_KEY=your_generated_key_here
NEXT_PUBLIC_DOMAIN=your-domain.com
\`\`\`

### 2. Update Build Scripts

The protection system integrates automatically during build. Make sure to:

1. Run build protection before deployment
2. Keep `.env.protection` private
3. Never commit sensitive keys to version control

### 3. Integration

The protection is already integrated into your app. It runs automatically on:
- Application startup
- Page navigation
- Critical operations

## Configuration

Edit `config.ts` to customize:
- Required environment variables
- Allowed domains
- Protection levels
- Feature flags

## Important Notes

⚠️ **Security Through Obscurity**: This protection makes forking harder but not impossible. It's designed to:
- Deter casual copying
- Make unauthorized deployment obvious
- Add friction to the forking process

✅ **Best Practices**:
- Keep this folder out of public repositories if possible
- Use environment variables for sensitive config
- Regularly update protection mechanisms
- Combine with proper licensing and legal protection

## Maintenance

- Review protection logs regularly
- Update fingerprinting algorithms periodically
- Rotate license keys as needed
- Monitor for bypass attempts

## Disabling Protection

For development, you can disable specific protections in `config.ts`:
\`\`\`typescript
ENABLE_ENV_CHECK: false,
ENABLE_FINGERPRINT_CHECK: false,
ENABLE_LICENSE_CHECK: false,
\`\`\`
