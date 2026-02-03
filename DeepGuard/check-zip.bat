@echo off
echo.
echo ========================================
echo Checking Zip File Status
echo ========================================
echo.
if exist "C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip" (
    echo SUCCESS! Zip file created:
    echo C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip
    echo.
    dir "C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip"
    echo.
    echo Opening DeepGuard folder...
    start explorer "C:\Users\vrini\Downloads\DeepGuard"
) else (
    echo ERROR: Zip file not found!
    echo Creating it now...
    powershell -ExecutionPolicy Bypass -Command "Compress-Archive -Path 'C:\Users\vrini\Downloads\hackathon\digital-truth-engine-74202-main\*' -DestinationPath 'C:\Users\vrini\Downloads\DeepGuard\DeepGuard A1(2).zip' -Force"
    echo Done! Opening folder...
    start explorer "C:\Users\vrini\Downloads\DeepGuard"
)
echo.
pause
