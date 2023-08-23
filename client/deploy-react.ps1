# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js before proceeding."
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not installed. Please install npm before proceeding."
    exit 1
}

# # Create a new React app
# Write-Host "Creating a new React app..."
# npx create-react-app my-app
# cd my-app

# # Install gh-pages package as a development dependency
# npm install gh-pages --save-dev

# Modify package.json to add properties to the scripts object
# Modify package.json to add properties to the scripts object

# Modify package.json to add properties to the scripts object
# Add predeploy and deploy properties to the scripts object using jq
Write-Host "Adding predeploy and deploy properties to package.json..."
& ".\jq-win64.exe" --arg predeploy "npm run build" --arg deploy "gh-pages -d build" '.scripts += {predeploy: $predeploy, deploy: $deploy}' $packageJsonPath | Set-Content $packageJsonPath

# Modify package.json to include homepage property
Write-Host "Adding homepage property to package.json..."
$packageJsonContent.homepage = "https://<username>.github.io/my-app"

# Convert the updated object back to JSON and save to the file
$packageJsonContent | ConvertTo-Json | Set-Content $packageJsonPath

# Install the required dependencies
# Write-Host "Installing required dependencies..."
# npm install

# Build and deploy the app to GitHub Pages
Write-Host "Building and deploying the app to GitHub Pages..."
npm run deploy

Write-Host "App deployed to GitHub Pages."
