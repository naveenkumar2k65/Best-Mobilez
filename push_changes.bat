@echo off
echo Copying showroom images to workspace...
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\f358fe7d-246c-4a94-99c3-0141c5da20b7\iphone_showroom_1782665887965.png" "iphone_showroom.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\f358fe7d-246c-4a94-99c3-0141c5da20b7\samsung_showroom_1782665904534.png" "samsung_showroom.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\f358fe7d-246c-4a94-99c3-0141c5da20b7\family_buying_mobile_1782665921478.png" "family_buying_mobile.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\f358fe7d-246c-4a94-99c3-0141c5da20b7\happy_customer_mobile_1782665945110.png" "happy_customer_mobile.png"

echo Staging changes...
git add .

echo Committing changes...
git commit -m "Add new premium showroom images to hero slider"

echo Pushing to GitHub...
git push

echo Done!
pause
