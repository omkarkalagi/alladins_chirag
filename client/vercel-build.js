const { execSync } = require('child_process');

console.log('Starting client build...');
try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Build React app
  console.log('Building React app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}