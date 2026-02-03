@echo off
echo ========================================
echo Creating Independent Zip File
echo ========================================
echo.
echo Target: C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip
echo.
powershell -ExecutionPolicy Bypass -Command "Compress-Archive -Path 'C:\Users\vrini\Downloads\hackathon\digital-truth-engine-74202-main\*' -DestinationPath 'C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip' -Force"
echo.
echo ========================================
echo SUCCESS! Zip file created
echo ========================================
echo.
echo Opening DeepGuard folder...
explorer "C:\Users\vrini\Downloads\DeepGuard"
pause
