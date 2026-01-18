@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\rr983\Desktop\Contract_management_system"

echo.
echo ========================================
echo GitHub Repository Setup
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
if errorlevel 1 goto error

echo.
echo Step 2: Configuring Git user...
git config user.email "you@example.com"
git config user.name "Your Name"

echo.
echo Step 3: Adding all files...
git add .
if errorlevel 1 goto error

echo.
echo Step 4: Creating initial commit...
git commit -m "Initial commit: Contract Management System"
if errorlevel 1 goto error

echo.
echo Step 5: Renaming branch to main...
git branch -M main
if errorlevel 1 goto error

echo.
echo ========================================
echo SUCCESS! Repository initialized
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Go to https://github.com/new
echo 2. Create a new repository named "Contract_management_system"
echo 3. DO NOT initialize with README
echo 4. Copy the repository URL (https://github.com/YOUR_USERNAME/Contract_management_system.git)
echo 5. Return here and run this command:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git
echo    git push -u origin main
echo.
echo You will be prompted for authentication - use your GitHub Personal Access Token as password.
echo.
pause
goto end

:error
echo.
echo ERROR occurred during setup!
echo Please check the output above for details.
pause
goto end

:end
endlocal
