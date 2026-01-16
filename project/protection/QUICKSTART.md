# 🛡️ Protection System - Quick Reference

## Quick Start

\`\`\`bash
# 1. Initial setup
node protection/setup.js

# 2. Verify installation
node protection/verify.js

# 3. Test protection
npm run protect

# 4. Build with protection
npm run build
\`\`\`

## What Was Added

### New Files
- \`protection/\` - Complete protection system folder
- \`src/middleware.ts\` - Security headers middleware

### Modified Files
- \`src/app/layout.tsx\` - Added ProtectionProvider wrapper
- \`package.json\` - Added prebuild and protect scripts
- \`next.config.ts\` - Added webpack optimization

## Protection Features

✅ **Environment Validation** - Checks authorized domains  
✅ **Device Fingerprinting** - Tracks unique devices  
✅ **License System** - Validates license keys  
✅ **Build Protection** - Generates unique build IDs  
✅ **Runtime Integrity** - Detects code tampering  
✅ **Anti-Debugging** - Prevents inspection tools  
✅ **Security Headers** - Adds protective HTTP headers  

## How It Protects

1. **Domain Restriction**: Only runs on authorized domains
2. **License Validation**: Requires valid license key
3. **Fingerprint Tracking**: Identifies unique deployments
4. **Code Obfuscation**: Makes code harder to read in production
5. **Integrity Checks**: Detects modifications at runtime
6. **Anti-Tampering**: Blocks debugging attempts

## Configuration

Edit \`protection/config.ts\` to customize:

\`\`\`typescript
export const PROTECTION_CONFIG = {
  APP_ID: 'your-unique-id',
  ALLOWED_DOMAINS: ['your-domain.com'],
  ENABLE_ENV_CHECK: true,
  ENABLE_FINGERPRINT_CHECK: true,
  ENABLE_LICENSE_CHECK: true,
  ANTI_DEBUG: true, // Only in production
};
\`\`\`

## Environment Variables

Required in \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_APP_ID=ruhi-your-unique-id
NEXT_PUBLIC_DOMAIN=your-domain.com
NEXT_PUBLIC_LICENSE_KEY=your-license-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
\`\`\`

## Commands

| Command | Description |
|---------|-------------|
| \`node protection/setup.js\` | Initial setup |
| \`node protection/verify.js\` | Verify installation |
| \`node protection/generate-license.js [days]\` | Generate license |
| \`npm run protect\` | Run protection manually |
| \`npm run build\` | Build with protection |

## For Development

Protection is **automatically relaxed** in development mode:
- Domain checks disabled
- Anti-debugging disabled
- Fingerprinting lenient
- License checks optional

## For Production

Protection is **fully active**:
1. Build automatically applies protection
2. Validates on every request
3. Blocks unauthorized access
4. Logs security events

## Troubleshooting

### Protection blocking local development?
- Make sure \`NODE_ENV=development\`
- Check \`localhost\` is in ALLOWED_DOMAINS

### Build failing?
- Run \`node protection/verify.js\`
- Check all files are present
- Verify Node has write permissions

### License validation failing?
- Generate new key: \`node protection/generate-license.js\`
- Add to \`.env.local\`
- Rebuild the application

## Important Notes

⚠️ **Never commit:**
- \`.env.local\`
- \`.env.protection\`
- \`protection/build-constants.ts\`

⚠️ **Security Limitations:**
- Not foolproof - adds friction, not absolute security
- Client-side protection can be bypassed by determined attackers
- Use alongside legal protection and proper licensing

✅ **Best Practices:**
- Keep protection folder private if possible
- Rotate license keys regularly
- Monitor protection logs
- Combine with server-side validation
- Use proper legal licensing

## Getting Help

1. Read \`protection/README.md\` for detailed docs
2. Read \`protection/IMPLEMENTATION_GUIDE.md\` for setup guide
3. Run \`node protection/verify.js\` to diagnose issues
4. Check browser console for protection messages

## File Structure

\`\`\`
protection/
├── index.ts                    # Main manager
├── config.ts                   # Configuration
├── provider.tsx                # React wrapper
├── build-protector.js          # Build script
├── setup.js                    # Setup script
├── verify.js                   # Verification
├── generate-license.js         # License gen
├── validators/                 # Validation logic
├── utils/                      # Utilities
└── docs/                       # Documentation
\`\`\`

---

**Your app is now protected! Run \`npm run build\` to see it in action.**
