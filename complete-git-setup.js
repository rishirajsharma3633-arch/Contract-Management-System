const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\rr983\\Desktop\\Contract_management_system';
const gitExe = 'C:\\Program Files\\Git\\bin\\git.exe';

function runGit(args) {
  try {
    const result = spawnSync(gitExe, args, {
      cwd: projectDir,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    if (result.stdout) console.log(result.stdout);
    if (result.stderr) console.error(result.stderr);
    if (result.error) throw result.error;
    
    return result.status === 0;
  } catch (error) {
    console.error(`Error running git ${args.join(' ')}:`, error.message);
    return false;
  }
}

console.log('Starting Git configuration...\n');

// Configure user
console.log('Configuring git user...');
runGit(['config', 'user.name', 'Your Name']);
runGit(['config', 'user.email', 'your-email@example.com']);

// Add all files
console.log('\nAdding files...');
runGit(['add', '.']);

// Create commit
console.log('\nCreating initial commit...');
runGit(['commit', '-m', 'Initial commit: Contract Management System']);

// Set main branch
console.log('\nSetting main branch...');
runGit(['branch', '-M', 'main']);

// Check status
console.log('\n=== REPOSITORY STATUS ===\n');
runGit(['status']);

console.log('\n=== SUCCESS ===');
console.log('\nNext steps:');
console.log('1. Create a new repository on GitHub: https://github.com/new');
console.log('2. Name it: Contract_management_system');
console.log('3. Copy the repository URL');
console.log('4. Run these commands:');
console.log('   git remote add origin <your-repo-url>');
console.log('   git push -u origin main');
console.log('\nUse your GitHub Personal Access Token as password when prompted.');
