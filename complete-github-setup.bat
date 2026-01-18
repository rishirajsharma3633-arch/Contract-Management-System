@echo off
cd /d "c:\Users\rr983\Desktop\Contract_management_system"

echo.
echo ====================================
echo Git Repository Setup - Step 2
echo ====================================
echo.

echo Configuring git user...
"C:\Program Files\Git\bin\git.exe" config user.name "Your Name"
"C:\Program Files\Git\bin\git.exe" config user.email "your-email@example.com"

echo.
echo Adding all files to staging...
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo Creating initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Contract Management System"

echo.
echo Setting main branch...
"C:\Program Files\Git\bin\git.exe" branch -M main

echo.
echo ====================================
echo Git Status
echo ====================================
echo.
"C:\Program Files\Git\bin\git.exe" status

echo.
echo ====================================
echo NEXT STEPS
echo ====================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create repository "Contract_management_system"
echo 3. Copy your repository URL
echo 4. Open Command Prompt and run:
echo.
echo    cd "c:\Users\rr983\Desktop\Contract_management_system"
echo    git remote add origin YOUR_REPO_URL_HERE
echo    git push -u origin main
echo.
echo    Replace YOUR_REPO_URL_HERE with your actual GitHub repo URL
echo.
echo.
pause
