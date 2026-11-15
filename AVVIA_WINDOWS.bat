@echo off
cd /d "%~dp0"
where node >nul 2>&1 || (echo Installa Node.js 22 o successivo. & pause & exit /b 1)
echo Apri http://localhost:8000 nel browser dopo l'avvio.
node scripts/serve.mjs
pause
