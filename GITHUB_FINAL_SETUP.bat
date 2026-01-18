@echo off
REM Run this batch file to complete GitHub setup

cd /d "c:\Users\rr983\Desktop\Contract_management_system"

title Git Repository Setup

echo.
echo ============================================================
echo FINALIZING GIT REPOSITORY FOR GITHUB UPLOAD
echo ============================================================
echo.

echo Adding all project files to git...
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo Creating initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Contract Management System"

echo.
echo Setting main branch...
"C:\Program Files\Git\bin\git.exe" branch -M main

echo.
echo Getting current status...
"C:\Program Files\Git\bin\git.exe" status

echo.
echo ============================================================
echo SUCCESS! Git Repository is Ready!
echo ============================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Create a new repository on GitHub:
echo    https://github.com/new
echo.
echo 2. Repository settings:
echo    Name: Contract_management_system
echo    Do NOT initialize with README/gitignore/license
echo.
echo 3. After creating, copy the repository URL
echo.
echo 4. Run these commands in a new Command Prompt window:
echo.
echo    cd "c:\Users\rr983\Desktop\Contract_management_system"
echo    git remote add origin YOUR_GITHUB_REPO_URL
echo    git push -u origin main
echo.
echo 5. Use your GitHub Personal Access Token as password
echo    (Create at: https://github.com/settings/tokens)
echo.
echo ============================================================
echo.
echo This batch file location: %~f0
echo.
pause
