import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const moodboardPath = path.resolve('./LIME_GREEN_AI_MOODBOARD.jpg');
const imageBase64 = fs.readFileSync(moodboardPath).toString('base64');
const imgSrc = `data:image/jpeg;base64,${imageBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AI-Driven Multi-Factor Ephemeral Attendance System - Mood Board Specification</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap');

  @page {
    size: A4 portrait;
    margin: 14mm 12mm 14mm 12mm;
    @bottom-right {
      content: counter(page);
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #07100A;
    color: #f1f5f9;
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    page-break-after: always;
    padding: 10px 0;
    position: relative;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Typography */
  h1, h2, h3, h4 {
    color: #ffffff;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  .text-lime {
    color: #BCFF00 !important;
  }

  .bg-lime {
    background-color: #BCFF00 !important;
    color: #07100A !important;
  }

  .border-lime {
    border-color: rgba(188, 255, 0, 0.4) !important;
  }

  /* Panels & Cards */
  .card {
    background-color: #0B1510;
    border: 1px solid #1C3527;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 14px;
  }

  .card-glow {
    background-color: #0B1510;
    border: 1px solid rgba(188, 255, 0, 0.4);
    box-shadow: 0 0 20px rgba(188, 255, 0, 0.1);
  }

  .badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 9999px;
    font-size: 9.5px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    border: 1px solid rgba(188, 255, 0, 0.3);
    background: rgba(188, 255, 0, 0.12);
    color: #BCFF00;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }

  .grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  /* Header / Footer */
  .header-banner {
    border-bottom: 1.5px solid #1C3527;
    padding-bottom: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .doc-footer {
    border-top: 1px solid #1C3527;
    padding-top: 8px;
    font-size: 9px;
    color: #64748b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
  }

  .img-frame {
    border: 1px solid rgba(188, 255, 0, 0.4);
    border-radius: 12px;
    overflow: hidden;
    background: #07100A;
    margin: 12px 0;
    box-shadow: 0 4px 25px rgba(0,0,0,0.5);
  }

  .img-frame img {
    width: 100%;
    display: block;
    height: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-top: 8px;
  }

  th, td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid #1C3527;
  }

  th {
    background: #07100A;
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    text-transform: uppercase;
  }

  .pill {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
  }

  .pill-green {
    background: rgba(188, 255, 0, 0.15);
    color: #BCFF00;
    border: 1px solid rgba(188, 255, 0, 0.3);
  }

  .pill-amber {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .pill-rose {
    background: rgba(244, 63, 94, 0.15);
    color: #fb7185;
    border: 1px solid rgba(244, 63, 94, 0.3);
  }

  .stat-dial {
    font-size: 26px;
    font-weight: 900;
    font-family: 'JetBrains Mono', monospace;
    color: #BCFF00;
  }
</style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER & MASTER INFOGRAPHIC ==================== -->
  <div class="page">
    <div>
      <div class="header-banner">
        <div>
          <span class="badge">INSTITUTIONAL AI ARCHITECTURE SPECIFICATION</span>
          <h1 style="font-size: 22px; margin-top: 6px; color: #ffffff;">
            AI-Driven Multi-Factor Ephemeral Attendance System
          </h1>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 2px;">
            Touchless Doorway 2FA • Single-Camera Continuous Tracking • 12-Hour Zero Retention Privacy
          </p>
        </div>
        <div style="text-align: right;">
          <div class="font-mono text-lime" style="font-weight: 800; font-size: 13px;">CYBER LIME EDITION</div>
          <div style="color: #64748b; font-size: 10px;">HEX: #BCFF00 • #07100A-#0B1510</div>
        </div>
      </div>

      <!-- Master Infographic Image -->
      <div class="img-frame">
        <img src="${imgSrc}" alt="Master Mood Board Infographic" />
      </div>

      <!-- Color Palette System -->
      <div class="card" style="margin-top: 10px;">
        <div style="font-size: 11px; font-weight: 700; color: #ffffff; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;">
          🎨 OFFICIAL SYSTEM DESIGN TOKENS & COLOR PALETTE
        </div>
        <div class="grid-4">
          <div style="background: #07100A; border: 1px solid #1C3527; padding: 8px; border-radius: 8px; text-align: center;">
            <div style="background: #07100A; border: 1px solid #334155; height: 18px; border-radius: 4px; margin-bottom: 4px;"></div>
            <strong style="color: #fff; font-size: 10px;">#07100A</strong>
            <div style="color: #64748b; font-size: 8.5px;">Deep Base Obsidian</div>
          </div>
          <div style="background: #07100A; border: 1px solid #1C3527; padding: 8px; border-radius: 8px; text-align: center;">
            <div style="background: #0B1510; border: 1px solid #334155; height: 18px; border-radius: 4px; margin-bottom: 4px;"></div>
            <strong style="color: #fff; font-size: 10px;">#0B1510</strong>
            <div style="color: #64748b; font-size: 8.5px;">Elevated Card Surface</div>
          </div>
          <div style="background: #07100A; border: 1px solid #1C3527; padding: 8px; border-radius: 8px; text-align: center;">
            <div style="background: #14271D; border: 1px solid #334155; height: 18px; border-radius: 4px; margin-bottom: 4px;"></div>
            <strong style="color: #fff; font-size: 10px;">#14271D / #1C3527</strong>
            <div style="color: #64748b; font-size: 8.5px;">Cyber Wire Traces</div>
          </div>
          <div style="background: #07100A; border: 1px solid rgba(188, 255, 0, 0.4); padding: 8px; border-radius: 8px; text-align: center;">
            <div style="background: #BCFF00; height: 18px; border-radius: 4px; margin-bottom: 4px;"></div>
            <strong class="text-lime" style="font-size: 10px;">#BCFF00 (188,255,0)</strong>
            <div style="color: #d2ff4d; font-size: 8.5px;">Electric Lime Accent</div>
          </div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <span>AI ATTENDANCE SYSTEM ARCHITECTURE SPECIFICATION</span>
      <span>PAGE 1 / 4 • MASTER INFOGRAPHIC</span>
    </div>
  </div>

  <!-- ==================== PAGE 2: INTERFACE MOOD BOARDS (FACULTY & STUDENT) ==================== -->
  <div class="page">
    <div>
      <div class="header-banner">
        <div>
          <span class="badge">INTERACTIVE UI/UX SPECIFICATIONS</span>
          <h2 style="font-size: 18px; margin-top: 4px;">Dedicated Interface Mood Boards</h2>
        </div>
        <div class="font-mono text-lime" style="font-size: 10.5px;">FACULTY & STUDENT PORTALS</div>
      </div>

      <!-- Interface 1: Faculty -->
      <div class="card card-glow" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #1C3527; padding-bottom: 6px;">
          <div>
            <span class="pill pill-green">MOOD BOARD 01</span>
            <strong style="font-size: 13px; color: #ffffff; margin-left: 6px;">Faculty Live Control & Continuous Evaluation Dashboard</strong>
          </div>
          <span style="color: #94a3b8; font-size: 9.5px; font-family: 'JetBrains Mono';">Role: Course Instructors</span>
        </div>

        <div class="grid-3" style="margin-top: 10px;">
          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #BCFF00; margin-bottom: 4px;" class="font-mono">
              ⏱️ 45-Min Session Controller
            </div>
            <div style="text-align: center; padding: 6px 0;">
              <div class="stat-dial">42:18</div>
              <div style="font-size: 9px; color: #94a3b8;">Dwell Progress (Target: 45:00m)</div>
            </div>
            <p style="font-size: 9.5px; color: #cbd5e1; margin-top: 4px;">
              Controls lecture timing, speed simulation (1x/10x/60x turbo), and triggers immediate attendance roll call.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #10b981; margin-bottom: 4px;" class="font-mono">
              📊 45m Threshold Rules
            </div>
            <div style="font-size: 9.5px; line-height: 1.6; margin-top: 6px;">
              <div style="display: flex; justify-content: space-between; color: #BCFF00;">
                <span>Present (≥45m):</span> <strong>82% (28/34)</strong>
              </div>
              <div style="display: flex; justify-content: space-between; color: #fbbf24;">
                <span>Review Flag (30-44m):</span> <strong>12% (4/34)</strong>
              </div>
              <div style="display: flex; justify-content: space-between; color: #fb7185;">
                <span>Absent (&lt;30m):</span> <strong>6% (2/34)</strong>
              </div>
            </div>
            <p style="font-size: 9.5px; color: #cbd5e1; margin-top: 6px;">
              Automates Continuous Evaluation (CE) internal assessment grades from actual dwell presence.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #f59e0b; margin-bottom: 4px;" class="font-mono">
              ⚠️ Proxy Exception Triage
            </div>
            <div style="background: #0B1510; border: 1px solid rgba(245, 158, 11, 0.4); padding: 6px; border-radius: 6px; margin: 4px 0;">
              <div style="font-size: 9px; font-weight: 700; color: #fbbf24;">Flagged: STU105 (Proxy Alert)</div>
              <div style="font-size: 8.5px; color: #94a3b8;">NFC tapped, face confidence 0.38</div>
            </div>
            <p style="font-size: 9.5px; color: #cbd5e1;">
              1-Click approve/flag. Snapshot auto-shreds within 12 hours under the zero-retention protocol.
            </p>
          </div>
        </div>
      </div>

      <!-- Interface 2: Student -->
      <div class="card card-glow">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #1C3527; padding-bottom: 6px;">
          <div>
            <span class="pill pill-green">MOOD BOARD 02</span>
            <strong style="font-size: 13px; color: #ffffff; margin-left: 6px;">Student Attendance & Biometric Privacy Portal</strong>
          </div>
          <span style="color: #94a3b8; font-size: 9.5px; font-family: 'JetBrains Mono';">Role: Enrolled Students</span>
        </div>

        <div class="grid-3" style="margin-top: 10px;">
          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527; text-align: center;">
            <div style="font-size: 10px; font-weight: 700; color: #BCFF00; margin-bottom: 4px;" class="font-mono">
              🎯 Overall Standing Ring
            </div>
            <div class="stat-dial" style="margin: 4px 0;">95.8%</div>
            <div style="font-size: 9px; color: #10b981; font-weight: 700;">Good Academic Standing (≥75%)</div>
            <p style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
              23 Attended / 1 Missed. Fully eligible for end-semester examinations.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #38bdf8; margin-bottom: 4px;" class="font-mono">
              🕒 Session Dwell Timeline
            </div>
            <div style="font-size: 9px; color: #cbd5e1; line-height: 1.6; margin-top: 4px;">
              <div>• <strong>Doorway Tap:</strong> 10:01:14 AM (NFC + NIR)</div>
              <div>• <strong>Class Dwell:</strong> 45.8 mins Continuous</div>
              <div>• <strong>Status Awarded:</strong> <span style="color: #BCFF00; font-weight: 700;">Present (100%)</span></div>
            </div>
            <p style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
              Transparent minute-by-minute verification log visible to students.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #10b981; margin-bottom: 4px;" class="font-mono">
              🛡️ Ephemeral Privacy Badge
            </div>
            <div style="background: #0B1510; border: 1px solid rgba(16, 185, 129, 0.4); padding: 6px; border-radius: 6px; margin: 4px 0; font-size: 9px; color: #34d399;">
              ✓ Biometrics Purged from RAM<br>
              ✓ Zero Permanent Video Stored
            </div>
            <p style="font-size: 9px; color: #94a3b8;">
              Includes 1-Click dispute ledger allowing appeals within 24 hours of lecture.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <span>AI ATTENDANCE SYSTEM ARCHITECTURE SPECIFICATION</span>
      <span>PAGE 2 / 4 • FACULTY & STUDENT INTERFACES</span>
    </div>
  </div>

  <!-- ==================== PAGE 3: INTERFACE MOOD BOARDS (ADMIN & CAMERA VISION) ==================== -->
  <div class="page">
    <div>
      <div class="header-banner">
        <div>
          <span class="badge">INTERACTIVE UI/UX SPECIFICATIONS</span>
          <h2 style="font-size: 18px; margin-top: 4px;">System Telemetry & Live AI Vision Hub</h2>
        </div>
        <div class="font-mono text-lime" style="font-size: 10.5px;">ADMIN & CAMERA HUBS</div>
      </div>

      <!-- Interface 3: Admin -->
      <div class="card card-glow" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #1C3527; padding-bottom: 6px;">
          <div>
            <span class="pill pill-green">MOOD BOARD 03</span>
            <strong style="font-size: 13px; color: #ffffff; margin-left: 6px;">Administrator Telemetry, Timetable & 12h Audit Hub</strong>
          </div>
          <span style="color: #94a3b8; font-size: 9.5px; font-family: 'JetBrains Mono';">Role: IT Admin & Compliance Officers</span>
        </div>

        <div class="grid-3" style="margin-top: 10px;">
          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #f59e0b; margin-bottom: 4px;" class="font-mono">
              ⚡ Micro-UPS Telemetry
            </div>
            <div style="font-size: 9.5px; line-height: 1.6; color: #cbd5e1; margin-top: 4px;">
              <div>• <strong>Power Source:</strong> <span class="text-lime">AC Mains (100%)</span></div>
              <div>• <strong>Failover Latency:</strong> &lt;4ms Seamless</div>
              <div>• <strong>Battery Reserve:</strong> ~4.8 Hours Run</div>
            </div>
            <p style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
              Real-time battery voltage, thermal monitor, and automatic power switchover.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #BCFF00; margin-bottom: 4px;" class="font-mono">
              💾 SQLite WAL Offline Sync
            </div>
            <div style="font-size: 9.5px; line-height: 1.6; color: #cbd5e1; margin-top: 4px;">
              <div>• <strong>Storage Engine:</strong> SQLite 3 WAL</div>
              <div>• <strong>Pending Queue:</strong> 0 Records (Synced)</div>
              <div>• <strong>Offline Resilience:</strong> 100% Guaranteed</div>
            </div>
            <p style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
              Buffers attendance during network drops; auto-syncs upon reconnection.
            </p>
          </div>

          <div style="background: #07100A; padding: 10px; border-radius: 8px; border: 1px solid #1C3527;">
            <div style="font-size: 10px; font-weight: 700; color: #10b981; margin-bottom: 4px;" class="font-mono">
              🔒 12-Hour Zero Retention Audit
            </div>
            <div style="font-size: 8.5px; font-family: 'JetBrains Mono'; color: #34d399; line-height: 1.5; margin-top: 4px;">
              [04:00 UTC] Purged 14 TTL Snapshots<br>
              [08:00 UTC] RAM Vector Buffer Wiped<br>
              [12:00 UTC] 0 Bytes Retained Verified
            </div>
            <p style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
              Cryptographic log proving GDPR & institutional compliance.
            </p>
          </div>
        </div>
      </div>

      <!-- Interface 4 & 5: AI Vision Hub & Mobile Node -->
      <div class="grid-2">
        <div class="card card-glow">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #1C3527; padding-bottom: 4px;">
            <div>
              <span class="pill pill-green">MOOD BOARD 04</span>
              <strong style="font-size: 11.5px; color: #ffffff; margin-left: 4px;">AI Single-Camera Vision Hub</strong>
            </div>
          </div>
          <div style="font-size: 9.5px; color: #cbd5e1; line-height: 1.5; margin-top: 6px;">
            <div>• <strong>Neon Reticle HUD:</strong> Multi-face bounding boxes with 99.4% confidence rating.</div>
            <div>• <strong>Spatial Heatmap:</strong> Live density gradients visualizing seat engagement.</div>
            <div>• <strong>Near-Infrared Filter:</strong> 850nm optical sensor bypasses ambient lighting flicker.</div>
            <div>• <strong>Volatile Tensor Buffer:</strong> Live in-memory processing without writing MP4 to disk.</div>
          </div>
        </div>

        <div class="card card-glow">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #1C3527; padding-bottom: 4px;">
            <div>
              <span class="pill pill-green">MOOD BOARD 05</span>
              <strong style="font-size: 11.5px; color: #ffffff; margin-left: 4px;">Mobile Phone Node & Portable Check-in</strong>
            </div>
          </div>
          <div style="font-size: 9.5px; color: #cbd5e1; line-height: 1.5; margin-top: 6px;">
            <div>• <strong>Low-Latency WebRTC:</strong> 1080p @ 30 FPS video streaming over local Wi-Fi (~85ms).</div>
            <div>• <strong>Doorway NFC Wallet Pass:</strong> Apple/Google Wallet digital student ID pass simulator.</div>
            <div>• <strong>Portable Node:</strong> Deploy instant pop-up attendance for auditoriums or field labs.</div>
            <div>• <strong>Thermal Optimization:</strong> Edge inference consumes ~12% battery/hr on mobile.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <span>AI ATTENDANCE SYSTEM ARCHITECTURE SPECIFICATION</span>
      <span>PAGE 3 / 4 • ADMIN & CAMERA VISION HUBS</span>
    </div>
  </div>

  <!-- ==================== PAGE 4: EXTERNAL HARDWARE DEVICES & LOCALHOST RUN GUIDE ==================== -->
  <div class="page">
    <div>
      <div class="header-banner">
        <div>
          <span class="badge">PHYSICAL HARDWARE & ACCESS SPECIFICATION</span>
          <h2 style="font-size: 18px; margin-top: 4px;">External Hardware Devices & Localhost Guide</h2>
        </div>
        <div class="font-mono text-lime" style="font-size: 10.5px;">HARDWARE & RUN GUIDE</div>
      </div>

      <!-- External Hardware Devices Mood Board -->
      <div class="card card-glow" style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #1C3527; padding-bottom: 6px;">
          <div>
            <span class="pill pill-green">MOOD BOARD 06</span>
            <strong style="font-size: 13px; color: #ffffff; margin-left: 6px;">External Hardware Devices Specification</strong>
          </div>
          <span style="color: #BCFF00; font-size: 9.5px; font-family: 'JetBrains Mono'; font-weight: 700;">Physical Deployment</span>
        </div>

        <div class="grid-4" style="margin-top: 10px;">
          
          <div style="background: #07100A; border: 1px solid #1C3527; padding: 10px; border-radius: 8px;">
            <div style="font-size: 10px; font-weight: 700; color: #BCFF00; font-family: 'JetBrains Mono'; margin-bottom: 4px;">
              1. Doorway 2FA Scanner
            </div>
            <ul style="font-size: 8.5px; color: #cbd5e1; list-style: square; padding-left: 12px; line-height: 1.5;">
              <li>13.56MHz ISO14443A NFC reader</li>
              <li>850nm NIR thermal-optic sensor</li>
              <li>Sub-300ms vector matching</li>
              <li>Anti-buddy punching defense</li>
            </ul>
          </div>

          <div style="background: #07100A; border: 1px solid #1C3527; padding: 10px; border-radius: 8px;">
            <div style="font-size: 10px; font-weight: 700; color: #38bdf8; font-family: 'JetBrains Mono'; margin-bottom: 4px;">
              2. Overhead AI Camera
            </div>
            <ul style="font-size: 8.5px; color: #cbd5e1; list-style: square; padding-left: 12px; line-height: 1.5;">
              <li>4K UHD 120° Wide-Angle lens</li>
              <li>Low-light NIR sensitivity</li>
              <li>Ceiling center mount</li>
              <li>40+ seat continuous coverage</li>
            </ul>
          </div>

          <div style="background: #07100A; border: 1px solid #1C3527; padding: 10px; border-radius: 8px;">
            <div style="font-size: 10px; font-weight: 700; color: #BCFF00; font-family: 'JetBrains Mono'; margin-bottom: 4px;">
              3. Edge AI Gateway
            </div>
            <ul style="font-size: 8.5px; color: #cbd5e1; list-style: square; padding-left: 12px; line-height: 1.5;">
              <li>Rugged fanless aluminum SBC</li>
              <li>NPU tensor accelerator</li>
              <li>Integrated Micro-UPS backup</li>
              <li>Volatile RAM frame shredder</li>
            </ul>
          </div>

          <div style="background: #07100A; border: 1px solid #1C3527; padding: 10px; border-radius: 8px;">
            <div style="font-size: 10px; font-weight: 700; color: #10b981; font-family: 'JetBrains Mono'; margin-bottom: 4px;">
              4. SQLite WAL Buffer
            </div>
            <ul style="font-size: 8.5px; color: #cbd5e1; list-style: square; padding-left: 12px; line-height: 1.5;">
              <li>High-speed WAL local engine</li>
              <li>Autonomous offline buffering</li>
              <li>Automatic cloud sync on reconnect</li>
              <li>Zero data drop guarantee</li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Localhost Server & Software Access Guide -->
      <div class="card" style="border: 1px solid rgba(188, 255, 0, 0.4); background: #0B1510;">
        <div style="font-size: 11.5px; font-weight: 800; color: #BCFF00; font-family: 'JetBrains Mono'; margin-bottom: 8px;">
          🚀 LOCALHOST ACCESS URLS & RUNTIME PORTS
        </div>

        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Port / Protocol</th>
              <th>Localhost Access URL</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody class="font-mono">
            <tr>
              <td style="color: #ffffff; font-weight: 700; font-family: 'Inter';">Frontend Web Application</td>
              <td style="color: #BCFF00;">Port 5173 (HTTP/Vite)</td>
              <td style="color: #38bdf8; font-weight: 700;">http://localhost:5173/</td>
              <td><span class="pill pill-green">ONLINE & ACTIVE</span></td>
            </tr>
            <tr>
              <td style="color: #ffffff; font-weight: 700; font-family: 'Inter';">Backend API & Telemetry Engine</td>
              <td style="color: #BCFF00;">Port 5000 (HTTP/SSE)</td>
              <td style="color: #38bdf8; font-weight: 700;">http://localhost:5000/</td>
              <td><span class="pill pill-green">ONLINE & ACTIVE</span></td>
            </tr>
            <tr>
              <td style="color: #ffffff; font-weight: 700; font-family: 'Inter';">Mobile Companion Gateway</td>
              <td style="color: #BCFF00;">Port 5173 (LAN Wi-Fi)</td>
              <td style="color: #38bdf8; font-weight: 700;">http://192.168.220.75:5173/</td>
              <td><span class="pill pill-green">ONLINE & ACTIVE</span></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 10px; font-size: 9.5px; color: #94a3b8; background: #07100A; padding: 8px 12px; border-radius: 6px; border: 1px solid #1C3527;">
          <strong style="color: #BCFF00;">Quick Navigation in Software:</strong> Open <span style="color: #38bdf8;">http://localhost:5173/</span> in your web browser. Click on the <strong>"Scope & Mood Boards"</strong> tab to interactively switch between the Master Infographic, Faculty Dashboard, Student Portal, Admin Telemetry, AI Vision Hub, Mobile Node, and External Hardware Devices mood boards.
        </div>
      </div>
    </div>

    <div class="doc-footer">
      <span>AI ATTENDANCE SYSTEM ARCHITECTURE SPECIFICATION</span>
      <span>PAGE 4 / 4 • HARDWARE & ACCESS SPECIFICATION</span>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.resolve('./temp_moodboard_spec.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

const outputPdfPath = path.resolve('./AI_ATTENDANCE_MOODBOARD_SPECIFICATION.pdf');
const clientPublicPdfPath = path.resolve('./client/public/AI_ATTENDANCE_MOODBOARD_SPECIFICATION.pdf');

// Check Chrome or Edge
const chromePath = 'C:\\Program Files\\Google\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browserExe = fs.existsSync(chromePath) ? chromePath : edgePath;

console.log(`Using browser: ${browserExe}`);

const cmd = `"${browserExe}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${htmlPath}"`;
console.log('Running command:', cmd);
execSync(cmd);

if (fs.existsSync(outputPdfPath)) {
  fs.copyFileSync(outputPdfPath, clientPublicPdfPath);
  console.log('PDF Generated Successfully at:');
  console.log(' - ' + outputPdfPath);
  console.log(' - ' + clientPublicPdfPath);
} else {
  console.error('PDF generation failed to output file');
}
