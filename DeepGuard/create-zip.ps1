# Copy entire project to DeepGuard folder first, then create zip
$targetFolder = "C:\Users\vrini\Downloads\DeepGuard"
$projectCopy = "$targetFolder\DeepGuard-AI-Application"
$zipPath = "$targetFolder\DeepGuard A1(2).zip"
$sourceFolder = "C:\Users\vrini\Downloads\hackathon\digital-truth-engine-74202-main"

Write-Host "`nCopying project to DeepGuard folder..." -ForegroundColor Cyan

# Remove old copy if exists
if (Test-Path $projectCopy) {
    Remove-Item $projectCopy -Recurse -Force
}

# Copy entire project
Copy-Item -Path $sourceFolder -Destination $projectCopy -Recurse -Force

Write-Host "Creating independent zip file..." -ForegroundColor Cyan
Compress-Archive -Path "$projectCopy\*" -DestinationPath $zipPath -Force

# Clean up the temporary copysh
Remove-Item $projectCopy -Recurse -Force

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`nZip file created at:" -ForegroundColor Yellow
Write-Host $zipPath -ForegroundColor White

$zipFile = Get-Item $zipPath
$sizeMB = [math]::Round($zipFile.Length / 1MB, 2)


Write-Host ""
Write-Host ("File size: {0} MB" -f $sizeMB)
Write-Host ("Created: {0}" -f $zipFile.LastWriteTime)
Write-Host ""
Write-Host "Opening folder..."
Start-Process explorer.exe $targetFolder