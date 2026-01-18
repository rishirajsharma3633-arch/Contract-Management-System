const { execSync } = require('child_process');
const path = require('path');

const projectDir = 'c:\\Users\\rr983\\Desktop\\Contract_management_system';

try {
  console.log('Starting Git repository setup...\n');
  
  process.chdir(projectDir);
  
  console.log('1. Initializing Git repository...');
  execSync('git init', { stdio: 'inherit' });
  
  console.log('\n2. Configuring Git user...');
  execSync('git config user.email "you@example.com"', { stdio: 'inherit' });
  execSync('git config user.name "Your Name"', { stdio: 'inherit' });
  
  console.log('\n3. Adding all files...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('\n4. Creating initial commit...');
  execSync('git commit -m "Initial commit: Contract Management System"', { stdio: 'inherit' });
  
  console.log('\n5. Renaming branch to main...');
  execSync('git branch -M main', { stdio: 'inherit' });
  
  console.log('\n========================================');
  console.log('SUCCESS! Repository initialized');
  console.log('========================================\n');
  
  console.log('NEXT STEPS:');
  console.log('1. Go to https://github.com/new');
  console.log('2. Create a new repository named "Contract_management_system"');
  console.log('3. DO NOT initialize with README');
  console.log('4. Copy the repository URL');
  console.log('5. Run this command:');
  console.log('   git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git');
  console.log('   git push -u origin main');
  console.log('\nUse your GitHub Personal Access Token as password when prompted.\n');
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
