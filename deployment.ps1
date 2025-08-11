# Variables
$KeyPath = "C:\Users\ANT PC\Reservemyplot_mvp_v1.pem"
$User = "ubuntu"
$EC2Host = "35.174.130.58"
$LocalBuildDir = "dist\*"

# Prompt the user for the target folder name
$TargetFolder = Read-Host "Enter the target folder name in /var/www/html/"
$TargetDir = "/var/www/html/$TargetFolder"

Write-Host "Starting deployment process..."

# Step 1: Run the build process
Write-Host "Running build process..."
npm run build

# Step 2: Connect to the EC2 instance and prepare the target directory
Write-Host "Setting up directory on EC2 instance..."
ssh -i "${KeyPath}" ${User}@${EC2Host} "sudo mkdir -p ${TargetDir}; sudo chown -R ubuntu:ubuntu ${TargetDir}; sudo chmod -R 755 ${TargetDir}"

# Step 3: Transfer the built files to the EC2 instance
Write-Host "Transferring files to ${TargetDir}..."
scp -i "${KeyPath}" -r ${LocalBuildDir} ${User}@${EC2Host}:${TargetDir}

# Step 4: Generate the Access Link
$Link = "https://sidm.spatialcraft.in/$TargetFolder"
Write-Host "Deployment to ${TargetDir} completed successfully!"
Write-Host "Access the deployed application here: $Link"
