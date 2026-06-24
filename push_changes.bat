@echo off
echo Staging changes...
git add .

echo Committing changes...
git commit -m "Update service cards with high-res images and customize theme to brand purple and magenta colors"

echo Pushing to GitHub...
git push

echo Done!
pause
