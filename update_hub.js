const fs = require('fs');

const cssStart = 746;
const cssEnd = 1525;
const htmlStart = 2763;
const htmlEnd = 2906;

let lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

const newCss = `    /* ── AI Photo Slideshow CSS ── */
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .repair-hub {
      position: relative;
      width: 100%;
      max-width: 650px;
      height: 480px;
      background: #090e1a;
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 24px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 24px 60px rgba(0, 0, 0, 0.6),
        0 0 50px rgba(99, 102, 241, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Glass reflection overlay */
    .rh-glare {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);
      pointer-events: none;
      z-index: 10;
    }

    /* HUD Overlay */
    .rh-hud-overlay {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      pointer-events: none;
      z-index: 5;
      box-shadow: inset 0 0 40px rgba(99, 102, 241, 0.15);
    }

    .rh-hud-header {
      position: absolute;
      top: 15px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Courier New', monospace;
      font-size: 0.65rem;
      color: rgba(165, 180, 252, 0.6);
      letter-spacing: 0.1em;
      z-index: 6;
    }

    .rh-hud-title {
      display: flex;
      align-items: center;
      gap: 6px;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 700;
    }

    .rh-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: liveBlink 1.5s step-end infinite;
    }

    @keyframes liveBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .rh-screen-feed {
      position: relative;
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background: #020617;
    }

    /* Animation Loop Timings */
    .rh-step {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      transform: scale(1.05);
      transition: transform 0.6s ease, opacity 0.6s ease;
      animation-duration: 20s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    .rh-step img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      filter: contrast(1.1) brightness(0.9);
    }

    /* SCANLINE EFFECT */
    .rh-step::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 51%);
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 2;
    }

    /* 4 steps * 5s each = 20s total loop */
    .step-motherboard { animation-name: step1Loop; }
    .step-screen      { animation-name: step2Loop; }
    .step-glass       { animation-name: step3Loop; }
    .step-sim         { animation-name: step4Loop; }

    @keyframes step1Loop {
      0%, 20% { opacity: 1; transform: scale(1); pointer-events: auto; z-index: 2; }
      23%, 97% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
      100% { opacity: 1; transform: scale(1); pointer-events: auto; z-index: 2; }
    }

    @keyframes step2Loop {
      0%, 22% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
      25%, 45% { opacity: 1; transform: scale(1); pointer-events: auto; z-index: 2; }
      48%, 100% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
    }

    @keyframes step3Loop {
      0%, 47% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
      50%, 70% { opacity: 1; transform: scale(1); pointer-events: auto; z-index: 2; }
      73%, 100% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
    }

    @keyframes step4Loop {
      0%, 72% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
      75%, 95% { opacity: 1; transform: scale(1); pointer-events: auto; z-index: 2; }
      98%, 100% { opacity: 0; transform: scale(1.05); pointer-events: none; z-index: 1; }
    }

    /* HUD FOOTER & STATUS SYSTEM */
    .rh-hud-footer {
      background: rgba(8, 10, 22, 0.95);
      border-top: 1px solid rgba(99, 102, 241, 0.2);
      padding: 15px 20px;
      z-index: 6;
      position: relative;
    }

    .rh-progress-container {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 12px;
    }

    .rh-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #6366f1, #a78bfa, #10b981);
      width: 0%;
      animation: progressLoop 20s linear infinite;
    }

    @keyframes progressLoop {
      0% { width: 0%; }
      20% { width: 25%; }
      22% { width: 25%; }
      25% { width: 25%; }
      45% { width: 50%; }
      47% { width: 50%; }
      50% { width: 50%; }
      70% { width: 75%; }
      72% { width: 75%; }
      75% { width: 75%; }
      95% { width: 100%; }
      98%, 100% { width: 100%; }
    }

    .rh-status-readout {
      position: relative;
      height: 36px;
    }

    .rh-status-item {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.4s ease;
      animation-duration: 20s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    .status-mb { animation-name: step1LoopStatus; }
    .status-sc { animation-name: step2LoopStatus; }
    .status-gl { animation-name: step3LoopStatus; }
    .status-sm { animation-name: step4LoopStatus; }

    @keyframes step1LoopStatus {
      0%, 20% { opacity: 1; transform: translateY(0); }
      23%, 97% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes step2LoopStatus {
      0%, 22% { opacity: 0; transform: translateY(10px); }
      25%, 45% { opacity: 1; transform: translateY(0); }
      48%, 100% { opacity: 0; transform: translateY(-10px); }
    }

    @keyframes step3LoopStatus {
      0%, 47% { opacity: 0; transform: translateY(10px); }
      50%, 70% { opacity: 1; transform: translateY(0); }
      73%, 100% { opacity: 0; transform: translateY(-10px); }
    }

    @keyframes step4LoopStatus {
      0%, 72% { opacity: 0; transform: translateY(10px); }
      75%, 95% { opacity: 1; transform: translateY(0); }
      98%, 100% { opacity: 0; transform: translateY(-10px); }
    }

    .rh-status-val {
      font-size: 0.82rem;
      font-weight: 800;
      color: white;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .rh-status-lbl {
      font-family: 'Courier New', monospace;
      font-size: 0.6rem;
      color: rgba(165, 180, 252, 0.5);
      margin-top: 2px;
    }`;

const newHtml = `              <!-- Screen feed viewport -->
              <div class="rh-screen-feed">
                
                <!-- STEP 1: MOTHERBOARD CHIP micro-soldering -->
                <div class="rh-step step-motherboard">
                  <img src="miniature_repair.png" alt="Miniature repair workers on motherboard">
                </div>

                <!-- STEP 2: SCREEN REPLACEMENT -->
                <div class="rh-step step-screen">
                  <img src="repair_screen.png" alt="Workers assembling screen">
                </div>

                <!-- STEP 3: TEMPERED GLASS -->
                <div class="rh-step step-glass">
                  <img src="tempered_glass.png" alt="Tempered glass application">
                </div>

                <!-- STEP 4: SIM INSERT -->
                <div class="rh-step step-sim">
                  <img src="phone_repair_board.png" alt="SIM insertion diagnostics">
                </div>

              </div>`;

// Splice backwards
lines.splice(htmlStart, htmlEnd - htmlStart + 1, newHtml);
lines.splice(cssStart, cssEnd - cssStart + 1, newCss);

fs.writeFileSync('index.html', lines.join('\\n'));
console.log("Replaced successfully!");
