# GitHub Pages deployment script

# Step 1: Build the project
Write-Host "Building the project for GitHub Pages..." -ForegroundColor Green
npm run build

# Step 2: Create necessary files for GitHub Pages
Write-Host "Creating .nojekyll file..." -ForegroundColor Green
New-Item -Path "out/.nojekyll" -ItemType File -Force | Out-Null

# Step 3: Copy GitHub Pages routing files
Write-Host "Copying routing files..." -ForegroundColor Green 
Copy-Item -Path "public/404.html" -Destination "out/404.html" -Force
Copy-Item -Path "public/index.html" -Destination "out/index.html" -Force

# Step 4: Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npx gh-pages -d out

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site should be live at: https://saksaud7.github.io/physiocare" -ForegroundColor Cyan 