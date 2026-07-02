@echo off
cd /d "%~dp0"
echo Copying newly generated images with proper branding to workspace...

copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\repairing_mobile_1782967861489.png" "repairing_mobile.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\storefront_exterior_1782968336100.png" "storefront_exterior.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\shop_worker_customer_1782968488619.png" "shop_worker_customer.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\accessory_display_1782968509885.png" "accessory_display.png"
copy /Y "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d\happy_unboxing_1782968673569.png" "happy_unboxing.png"

echo Done! Images have been replaced.
pause
