/**
 * License Key Generator
 * Run this script to generate a license key for your deployment
 * 
 * Usage:
 *   node protection/generate-license.js [days]
 * 
 * Example:
 *   node protection/generate-license.js 365  // Generate key valid for 1 year
 */

const { generateLicenseKey } = require('./validators/license');

function main() {
  const daysValid = parseInt(process.argv[2]) || 365;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysValid);

  console.log('🔑 Generating License Key...');
  console.log(`Valid for: ${daysValid} days`);
  console.log(`Expires: ${expirationDate.toISOString()}`);
  console.log('');

  const licenseKey = generateLicenseKey(expirationDate);
  
  console.log('License Key:');
  console.log(licenseKey);
  console.log('');
  console.log('Add this to your .env.local file:');
  console.log(`NEXT_PUBLIC_LICENSE_KEY=${licenseKey}`);
}

main();
