@echo off
cd /d "%~dp0"
echo.
echo === STEP 1: Copying ALL corrected BEST MOBILE branded images ===
echo.

set BRAIN=C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d

copy /Y "%BRAIN%\happy_customer_mobile_new_1782974902448.png" "happy_customer_mobile.png"
if %errorlevel%==0 (echo [OK] happy_customer_mobile.png) else (echo [FAIL] happy_customer_mobile.png)

copy /Y "%BRAIN%\storefront_exterior_new_1782971019055.png" "storefront_exterior.png"
if %errorlevel%==0 (echo [OK] storefront_exterior.png) else (echo [FAIL] storefront_exterior.png)

copy /Y "%BRAIN%\repairing_mobile_new_1782971032850.png" "repairing_mobile.png"
if %errorlevel%==0 (echo [OK] repairing_mobile.png) else (echo [FAIL] repairing_mobile.png)

copy /Y "%BRAIN%\shop_worker_customer_new_1782971145174.png" "shop_worker_customer.png"
if %errorlevel%==0 (echo [OK] shop_worker_customer.png) else (echo [FAIL] shop_worker_customer.png)

copy /Y "%BRAIN%\accessory_display_new_1782971158279.png" "accessory_display.png"
if %errorlevel%==0 (echo [OK] accessory_display.png) else (echo [FAIL] accessory_display.png)

copy /Y "%BRAIN%\happy_unboxing_new_1782971057876.png" "happy_unboxing.png"
if %errorlevel%==0 (echo [OK] happy_unboxing.png) else (echo [FAIL] happy_unboxing.png)

copy /Y "%BRAIN%\family_buying_mobile_new_1782971089827.png" "family_buying_mobile.png"
if %errorlevel%==0 (echo [OK] family_buying_mobile.png) else (echo [FAIL] family_buying_mobile.png)

echo.
echo === STEP 2: Git push to update live website ===
echo.
git add .
git commit -m "Fix ALL images with correct purple BEST + pink MOBILE branding"
git push
echo.
echo === DONE! Wait 2 minutes then refresh your live website ===
echo.
pause
