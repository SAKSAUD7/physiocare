# Deploy script for PhysioCare GitHub Pages

Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
npm run clean

Write-Host "Building for GitHub Pages..." -ForegroundColor Green
npm run build

Write-Host "Creating .nojekyll file..." -ForegroundColor Green
New-Item -Path "out/.nojekyll" -ItemType File -Force | Out-Null

Write-Host "Copying additional HTML files for GitHub Pages routing..." -ForegroundColor Green
Copy-Item -Path "public/404.html" -Destination "out/404.html" -Force
Copy-Item -Path "public/index.html" -Destination "out/index.html" -Force

Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npx gh-pages -d out

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site should be live at: https://saksaud7.github.io/physiocare" -ForegroundColor Cyan 