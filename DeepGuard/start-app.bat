@echo off
echo ========================================
echo Starting DeepGuard AI Application
echo ========================================
echo.
echo Opening browser...
start http://localhost:8080/
echo.
echo Starting development server...
echo Please wait for "VITE ready" message...
echo.
npm run dev
