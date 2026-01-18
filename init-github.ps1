#!/usr/bin/env powershell
# This script initializes your project as a Git repository and pushes it to GitHub

$ErrorActionPreference = "Stop"

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Green
    Write-Host ("=" * 60) -ForegroundColor Cyan
}

try {
    $projectPath = "c:\Users\rr983\Desktop\Contract_management_system"
    Set-Location $projectPath
    
    Write-Header "Step 1: Initializing Git Repository"
    & "C:\Program Files\Git\cmd\git.exe" init
    
    Write-Header "Step 2: Configuring Git User"
    & "C:\Program Files\Git\cmd\git.exe" config user.name "Your Name"
    & "C:\Program Files\Git\cmd\git.exe" config user.email "you@example.com"
    
    Write-Header "Step 3: Adding Files"
    & "C:\Program Files\Git\cmd\git.exe" add .
    
    Write-Header "Step 4: Creating Initial Commit"
    & "C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit: Contract Management System"
    
    Write-Header "Step 5: Renaming Branch to Main"
    & "C:\Program Files\Git\cmd\git.exe" branch -M main
    
    Write-Host ""
    Write-Host "SUCCESS! Git repository has been initialized." -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "NEXT STEPS TO PUSH TO GITHUB:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to https://github.com/new and create a new repository:"
Write-Host "   - Name: Contract_management_system"
Write-Host "   - DO NOT initialize with README"
Write-Host ""
Write-Host "2. After creating the repository, copy its URL (e.g., https://github.com/YOUR_USERNAME/Contract_management_system.git)"
Write-Host ""
Write-Host "3. Run these commands in PowerShell from your project directory:"
Write-Host ""
Write-Host '   $"C:\Program Files\Git\cmd\git.exe" remote add origin <YOUR_REPO_URL>' -ForegroundColor Magenta
Write-Host '   & "C:\Program Files\Git\cmd\git.exe" push -u origin main' -ForegroundColor Magenta
Write-Host ""
Write-Host "4. When prompted for authentication, use your GitHub Personal Access Token:"
Write-Host "   https://github.com/settings/tokens"
Write-Host ""
Write-Host "That's it! Your project will then be on GitHub." -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"
