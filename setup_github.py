#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir('c:\\Users\\rr983\\Desktop\\Contract_management_system')
git_exe = 'C:\\Program Files\\Git\\bin\\git.exe'

def run_git(args):
    """Run a git command and return success status"""
    try:
        cmd = [git_exe] + args
        print(f"Running: git {' '.join(args)}")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return False
    except Exception as e:
        print(f"Exception: {e}")
        return False

print("=" * 70)
print("FINALIZING GIT REPOSITORY")
print("=" * 70)
print()

# Add all files
print("✓ Adding all project files...")
run_git(['add', '.'])

print()
print("✓ Creating initial commit...")
run_git(['commit', '-m', 'Initial commit: Contract Management System'])

print()
print("✓ Setting main branch...")
run_git(['branch', '-M', 'main'])

print()
print("✓ Checking repository status...")
run_git(['status'])

print()
print("=" * 70)
print("SUCCESS! Your git repository is fully set up and ready!")
print("=" * 70)
print()
print("NEXT STEPS - Push to GitHub:")
print()
print("1. Go to https://github.com/new")
print("2. Create a new repository named: Contract_management_system")
print("3. Do NOT initialize with README, .gitignore, or license")
print("4. Click 'Create repository'")
print("5. Copy the repository URL (https://github.com/YOUR_USERNAME/Contract_management_system.git)")
print("6. Open Command Prompt and run:")
print()
print("   cd c:\\Users\\rr983\\Desktop\\Contract_management_system")
print("   git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git")
print("   git push -u origin main")
print()
print("7. When prompted for authentication, use your GitHub Personal Access Token")
print("   (Create one at: https://github.com/settings/tokens if you don't have one)")
print()
print("Your project will then be live on GitHub!")
print()
