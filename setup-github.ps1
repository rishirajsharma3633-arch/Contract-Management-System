#!/usr/bin/env pwsh

# Setup GitHub repository
Set-Location "c:\Users\rr983\Desktop\Contract_management_system"

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Configuring Git user..." -ForegroundColor Green
git config user.email "you@example.com"
git config user.name "Your Name"

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: Contract Management System"

Write-Host "Renaming branch to main..." -ForegroundColor Green
git branch -M main

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub.com (don't initialize with README)" -ForegroundColor Yellow
Write-Host "2. Run the following command to add the remote:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git" -ForegroundColor White
Write-Host "3. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "You may be prompted for authentication. Use your GitHub Personal Access Token as password." -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Cyan
