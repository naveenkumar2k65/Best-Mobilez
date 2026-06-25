@echo off
echo Staging changes...
git add .

echo Committing changes...
git commit -m "Expand repair estimator to include current iPhone, Samsung, and Google Pixel models"

echo Pushing to GitHub...
git push

echo Done!
pause
