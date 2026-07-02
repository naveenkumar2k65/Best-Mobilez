@echo off
cd /d "%~dp0"
echo Copying ALL new correctly branded images...

copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\storefront_exterior_new_1782971019055.png" "storefront_exterior.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\repairing_mobile_new_1782971032850.png" "repairing_mobile.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\shop_worker_customer_new_1782971145174.png" "shop_worker_customer.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\accessory_display_new_1782971158279.png" "accessory_display.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\happy_unboxing_new_1782971057876.png" "happy_unboxing.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\family_buying_mobile_new_1782971089827.png" "family_buying_mobile.png"

echo Images copied! Now pushing to GitHub...
git add .
git commit -m "Regenerate all images with exact BEST MOBILE purple+pink logo branding"
git push

echo DONE! Wait 2 minutes then refresh the live website.
pause
