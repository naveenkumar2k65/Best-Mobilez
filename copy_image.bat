@echo off
echo Copying generated circuit board image to workspace...
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\phone_repair_board_1782384060396.png" "phone_repair_board.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_screen_1782384520573.png" "repair_screen.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_battery_1782384537271.png" "repair_battery.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_water_1782384553345.png" "repair_water.png"
if %errorlevel% equ 0 (
    echo All 4 images copied successfully!
) else (
    echo Error copying images. Please check paths manually.
)
pause
