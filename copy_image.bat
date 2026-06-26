@echo off
echo Copying generated images to workspace...
copy "C:\Users\navee\.gemini\antigravity-ide\brain\8309cbb3-7166-41d6-9ef9-ee503e42ef38\phone_repair_board_clean_1782499844498.png" "phone_repair_board.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_screen_1782384520573.png" "repair_screen.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_battery_1782384537271.png" "repair_battery.png"
copy "C:\Users\navee\.gemini\antigravity-ide\brain\404b8ce5-caa9-413c-a314-faa9c50ab742\repair_water_1782384553345.png" "repair_water.png"
if %errorlevel% equ 0 (
    echo All images copied successfully!
) else (
    echo Error copying images. Please check paths manually.
)
pause
