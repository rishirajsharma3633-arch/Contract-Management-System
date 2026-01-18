# GitHub Upload Instructions

## Your project is ready to upload to GitHub!

### Prerequisites Completed:
✓ Git has been installed on your system
✓ Your project files are ready

### Step-by-Step Instructions:

#### Step 1: Create a GitHub Repository
1. Open https://github.com/new in your browser
2. Fill in:
   - Repository name: `Contract_management_system`
   - Description: `Contract Management System`
   - Choose Public or Private
3. **Important**: Do NOT check "Initialize this repository with a README"
4. Click "Create repository"

#### Step 2: Set Up Local Git (Choose ONE method)

**METHOD A: Using Git Bash (Recommended)**
1. Open File Explorer and go to: `c:\Users\rr983\Desktop\Contract_management_system`
2. Right-click in the folder → "Git Bash Here"
3. Copy and paste these commands one by one:

```bash
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
git add .
git commit -m "Initial commit: Contract Management System"
git branch -M main
```

**METHOD B: Using Command Prompt**
1. Open Command Prompt (Win+R, type `cmd`, press Enter)
2. Run:
```cmd
cd /d c:\Users\rr983\Desktop\Contract_management_system
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
git add .
git commit -m "Initial commit: Contract Management System"
git branch -M main
```

#### Step 3: Push to GitHub
1. After running the commands above, go back to your GitHub repository page
2. You'll see instructions - copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/Contract_management_system.git`)
3. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Contract_management_system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

#### Step 4: Authentication
When prompted for authentication:
- Username: Your GitHub username
- Password: **Use your Personal Access Token** (not your GitHub password)

**How to create a Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "GitHub Desktop"
4. Check the `repo` checkbox
5. Click "Generate token" and copy it
6. Use this token as your password

### All Files Ready:
Your project directory contains all necessary files:
- source code (src/)
- configuration files
- .gitignore (to exclude node_modules)
- package.json
- README.md

That's it! Your project will then be live on GitHub.
