@echo off
echo Staging changes...
git add .

echo Committing changes...
git commit -m "Rename to Best Mobile, update to 3D stacked logo, refocus to cell phone sales/service, and rename specialists to Samsung & iPhone Specialists"

echo Pushing to GitHub...
git push

echo Done!
pause
