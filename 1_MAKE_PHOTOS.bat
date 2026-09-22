@echo off
cd /d "%~dp0.."
pip install pillow
python TOOLS\make_photos.py --limit 10
echo.
echo If the 10 test photos look good, run again without --limit:  python TOOLS\make_photos.py
pause
