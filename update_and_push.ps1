# Best Mobile - Copy Images and Push to GitHub
# Right-click this file and select "Run with PowerShell"

Set-Location "c:\Users\navee\OneDrive\Desktop\Wireless-connect"

Write-Host "=== Copying new BEST MOBILE branded images ===" -ForegroundColor Cyan

$brain = "C:\Users\navee\.gemini\antigravity-ide\brain\718e9ff0-83bf-42f1-a9f6-eb345b4a772d"

Copy-Item -Force "$brain\storefront_exterior_new_1782971019055.png" "storefront_exterior.png"
Write-Host "Copied storefront_exterior.png" -ForegroundColor Green

Copy-Item -Force "$brain\repairing_mobile_new_1782971032850.png" "repairing_mobile.png"
Write-Host "Copied repairing_mobile.png" -ForegroundColor Green

Copy-Item -Force "$brain\shop_worker_customer_new_1782971145174.png" "shop_worker_customer.png"
Write-Host "Copied shop_worker_customer.png" -ForegroundColor Green

Copy-Item -Force "$brain\accessory_display_new_1782971158279.png" "accessory_display.png"
Write-Host "Copied accessory_display.png" -ForegroundColor Green

Copy-Item -Force "$brain\happy_unboxing_new_1782971057876.png" "happy_unboxing.png"
Write-Host "Copied happy_unboxing.png" -ForegroundColor Green

Copy-Item -Force "$brain\family_buying_mobile_new_1782971089827.png" "family_buying_mobile.png"
Write-Host "Copied family_buying_mobile.png" -ForegroundColor Green

Write-Host ""
Write-Host "=== Pushing to GitHub ===" -ForegroundColor Cyan
git add .
git commit -m "Fix all images with correct BEST MOBILE purple+pink logo branding"
git push

Write-Host ""
Write-Host "=== DONE! Wait 2 minutes then refresh the live website ===" -ForegroundColor Green
Read-Host "Press Enter to close"
