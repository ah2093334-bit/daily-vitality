@echo off
cd /d "%~dp0.."
set /p REPO=GitHub repo (USER/REPO, e.g. ah2093334-bit/daily-vitality): 
python TOOLS\dv_publish.py deploy --repo %REPO%
pause
