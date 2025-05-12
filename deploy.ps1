# PowerShell script to commit and push code to GitHub

# Initialize Git repository
git init

# Add all files to staging
git add .

# Commit changes with message
git commit -m "Initial commit: PhysioCare physiotherapy website"

# Set remote origin to the specific repository
git remote add origin https://github.com/SAKSAUD7/physiocare.git

# Push to GitHub
git push -u origin main

Write-Host "Code pushed to GitHub successfully!"
Write-Host "You can now deploy it using a service like Vercel by connecting to your GitHub repository." 