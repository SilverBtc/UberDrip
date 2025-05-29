#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying UberDrip deployment configuration...\n');

const distDir = path.join(__dirname, '..', 'dist');
const issues = [];
const success = [];

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  issues.push('❌ dist/ directory not found. Run "npm run build:web" first.');
} else {
  success.push('✅ dist/ directory exists');
}

// Check critical files
const criticalFiles = [
  { file: 'index.html', description: 'Main HTML file' },
  { file: '_redirects', description: 'Cloudflare redirects file' },
  { file: 'manifest.json', description: 'Web app manifest' }
];

criticalFiles.forEach(({ file, description }) => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    success.push(`✅ ${description} (${file})`);
    
    // Check file content for specific issues
    if (file === 'index.html') {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('ionicons')) {
        success.push('✅ Ionicons fonts are included in HTML');
      } else {
        issues.push('⚠️  Ionicons fonts may not be properly loaded');
      }
    }
    
    if (file === '_redirects') {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('uberdrip.pages.dev')) {
        success.push('✅ Redirect URL configured for production');
      } else {
        issues.push('⚠️  Redirect URL may not be configured for production');
      }
    }
  } else {
    issues.push(`❌ Missing ${description} (${file})`);
  }
});

// Check environment configuration
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  if (envContent.includes('https://uberdrip.pages.dev')) {
    success.push('✅ Environment variables configured for production');
  } else {
    issues.push('⚠️  Environment variables may not be configured for production');
  }
} else {
  issues.push('⚠️  .env file not found');
}

// Check package.json scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.scripts && packageJson.scripts['build:web']) {
    success.push('✅ Build script configured');
  } else {
    issues.push('❌ Build script not found in package.json');
  }
}

// Display results
console.log('📋 Verification Results:');
console.log('\n🎉 Successful checks:');
success.forEach(item => console.log(`   ${item}`));

if (issues.length > 0) {
  console.log('\n⚠️  Issues found:');
  issues.forEach(item => console.log(`   ${item}`));
  
  console.log('\n🔧 Recommended actions:');
  console.log('   1. Run "npm run build:web" to generate fresh build');
  console.log('   2. Check your .env file has production URLs');
  console.log('   3. Verify Supabase redirect URLs are configured');
  console.log('   4. Ensure all icon fonts are properly loaded');
} else {
  console.log('\n🎉 All checks passed! Your deployment is ready.');
}

console.log('\n🚀 To deploy to Cloudflare Pages:');
console.log('   1. Push changes to your Git repository');
console.log('   2. Cloudflare Pages will automatically build and deploy');
console.log('   3. Visit https://uberdrip.pages.dev to see your live app');

// Exit with error code if issues found
if (issues.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
