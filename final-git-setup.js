const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = 'c:\\Users\\rr983\\Desktop\\Contract_management_system';
const gitCmd = `"C:\\Program Files\\Git\\bin\\git.exe"`;

function git(args) {
  try {
    console.log(`Running: git ${args.join(' ')}`);
    const cmd = `${gitCmd} ${args.map(arg => `"${arg}"`).join(' ')}`;
    const output = execSync(cmd, { cwd: projectDir, encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

console.log('='.repeat(60));
console.log('COMPLETING GITHUB SETUP');
console.log('='.repeat(60));
console.log();

// Configure git
console.log('✓ Configuring git user...');
git(['config', 'user.name', 'Contract System User']);
git(['config', 'user.email', 'noreply@contractsystem.com']);

console.log();
console.log('✓ Adding all files...');
git(['add', '.']);

console.log();
console.log('✓ Creating initial commit...');
git(['commit', '-m', 'Initial commit: Contract Management System']);

console.log();
console.log('✓ Setting main branch...');
git(['branch', '-M', 'main']);

console.log();
console.log('✓ Checking git status...');
git(['status']);

console.log();
console.log('='.repeat(60));
console.log('GIT REPOSITORY IS READY!');
console.log('='.repeat(60));
console.log();
console.log('NEXT: Push to GitHub');
console.log();
console.log('1. Create repository at: https://github.com/new');
console.log('   Name: Contract_management_system');
console.log('   Do NOT initialize with README');
console.log();
console.log('2. Copy your repo URL from GitHub');
console.log();
console.log('3. Run this command (replace with your URL):');
console.log('   git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git');
console.log('   git push -u origin main');
console.log();
