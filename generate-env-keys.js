#!/usr/bin/env node

/**
 * Script to generate secure environment variables for Strapi deployment
 * Run: node generate-env-keys.js
 */

const crypto = require('crypto');

function generateKey() {
  return crypto.randomBytes(32).toString('base64');
}

function generateKeys() {
  const keys = [];
  for (let i = 0; i < 4; i++) {
    keys.push(generateKey());
  }
  return keys.join(',');
}

console.log('\n🔐 Generate Strapi Environment Variables\n');
console.log('Copy these values to your .env.production file or hosting platform:\n');
console.log('='.repeat(60));
console.log('\nAPP_KEYS=' + generateKeys());
console.log('API_TOKEN_SALT=' + generateKey());
console.log('ADMIN_JWT_SECRET=' + generateKey());
console.log('TRANSFER_TOKEN_SALT=' + generateKey());
console.log('JWT_SECRET=' + generateKey());
console.log('\n' + '='.repeat(60));
console.log('\n✅ Generated! Copy these to your environment variables.\n');





