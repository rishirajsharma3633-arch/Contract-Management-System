Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

projectDir = "c:\Users\rr983\Desktop\Contract_management_system"
gitExe = "C:\Program Files\Git\bin\git.exe"

' Change to project directory
objShell.CurrentDirectory = projectDir

WScript.Echo "============================================================"
WScript.Echo "GITHUB REPOSITORY SETUP"
WScript.Echo "============================================================"
WScript.Echo ""

' Add files
WScript.Echo "Step 1: Adding all files..."
Set objExec = objShell.Exec(gitExe & " add .")
WScript.Echo objExec.StdOut.ReadAll()

WScript.Sleep 1000

' Create commit
WScript.Echo "Step 2: Creating initial commit..."
Set objExec = objShell.Exec(gitExe & " commit -m ""Initial commit: Contract Management System""")
WScript.Echo objExec.StdOut.ReadAll()

WScript.Sleep 1000

' Set main branch
WScript.Echo "Step 3: Setting main branch..."
Set objExec = objShell.Exec(gitExe & " branch -M main")
WScript.Echo objExec.StdOut.ReadAll()

WScript.Sleep 1000

' Show status
WScript.Echo "Step 4: Repository status..."
Set objExec = objShell.Exec(gitExe & " status")
WScript.Echo objExec.StdOut.ReadAll()

WScript.Echo ""
WScript.Echo "============================================================"
WScript.Echo "SUCCESS! Git repository is ready for GitHub!"
WScript.Echo "============================================================"
WScript.Echo ""
WScript.Echo "NEXT STEPS:"
WScript.Echo "1. Create repository at: https://github.com/new"
WScript.Echo "2. Name it: Contract_management_system"
WScript.Echo "3. Do NOT initialize with README"
WScript.Echo "4. Copy the repository URL"
WScript.Echo "5. Run these commands:"
WScript.Echo "   git remote add origin YOUR_REPO_URL"
WScript.Echo "   git push -u origin main"
WScript.Echo ""
