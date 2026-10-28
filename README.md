# 🎓 UniSync AI: Student & Faculty Ephemeral Attendance Portal

[![React 18](https://img.shields.io/badge/React-18.3.1-3B82F6?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2-2563EB?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-1D4ED8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-60A5FA?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Privacy Compliance](https://img.shields.io/badge/GDPR%20%2F%20FERPA-12h_Zero_Retention-93C5FD?logo=shield&logoColor=black)](https://gdpr.eu/)

> **A high-contrast Blue, Black & White glassmorphic attendance management system designed exclusively for Students and Faculty members.** Built with a 4-tab minimalist navigation (`Home`, `Progress`, `Monitor`, `Profile`) and a dedicated personalized login portal for every member.

---

## 🌟 Key Features

1. **Dedicated Member Login Pages**:
   - Every individual student and faculty member has a **personalized login page** featuring their name, digital ID, roll number, NFC badge key, and real-time attendance standing.
   - **Simulated 2FA Biometric Authentication**: 1-click overhead camera facial vector match and doorway NFC validation.
   - Quick-switch avatar carousel to seamlessly hop between member login portals.
   - Manual password and PIN authentication options.

2. **Exclusively for Students & Faculty (No Admin Interface)**:
   - Streamlined, distraction-free environment tailored strictly for classroom learning and academic supervision.

3. **Minimalist 4-Button Navigation**:
   - `Home`: Active session card, 45-minute continuous lecture dial, and 1-click door NFC check-in.
   - `Progress`: Student attendance percentage rings, Continuous Evaluation (CE) breakdown (Assignments, Quizzes, Projects), and 1-click attendance dispute appeal modal.
   - `Monitor` *(Faculty Only)*: Live classroom attendance grid, real-time attention/dwell tracking, session timer controls, and 1-click proxy review drawer.
   - `Profile`: Digital holographic ID pass, live 2FA QR code, and 12-hour ephemeral zero-retention privacy certificate.

4. **Deep Blue & Glassmorphic Visual System**:
   - Frosted glass cards and panels with cyan/blue accents and subtle cyber grid backgrounds.
   - Glowing frosted glass containers (`IconBadge`) for all Lucide icons.

5. **12-Hour Ephemeral Zero-Retention Privacy**:
   - Biometric vectors and temporary exception frames are held in volatile memory and automatically wiped upon faculty review or 12-hour expiration.

---

## 👥 Pre-Configured Members Directory

| Member Name | Role | ID / Roll No | Class / Dept | Initial Standing |
| :--- | :--- | :--- | :--- | :--- |
| **Alex Mercer** | Student | `STU101` / `2026-CS-01` | CS401 (AI Systems) | 95.8% (Eligible) |
| **Sara Lin** | Student | `STU102` / `2026-CS-02` | CS401 (AI Systems) | 91.6% (Eligible) |
| **Devon Wright** | Student | `STU103` / `2026-CS-03` | CS401 (AI Systems) | 79.2% (Review) |
| **Elena Evans** | Student | `STU104` / `2026-CS-04` | CS401 (AI Systems) | 96.0% (Eligible) |
| **Marcus Chen** | Student | `STU105` / `2026-CS-05` | CS401 (AI Systems) | 71.5% (Warning) |
| **Zoe Nakamura** | Student | `STU106` / `2026-CS-06` | CS401 (AI Systems) | 68.0% (Critical) |
| **Dr. Evelyn Vance** | Faculty | `FAC001` | Computer Science & AI | AI Lab Director |
| **Prof. Alan Turing** | Faculty | `FAC002` | Computer Vision & Edge Systems | Research Lead |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS (Deep Onyx & Frosted Blue Glassmorphism)
- **Icons**: Lucide React with Glassmorphic Badges
- **QR Engine**: `qrcode.react`
- **Backend (Optional Live Edge Sync)**: Node.js native HTTP + Server-Sent Events (SSE) + SQLite WAL Mode
- **Deployment**: Configured for instant 1-click Vercel deployment via `vercel.json`

---

## 🚀 Quick Start

### 1. Run the Web Application
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Deploy to Vercel
1. Import repository `https://github.com/killeryt668-ops/AI_ATTENDANCE_MARKER.git` on [Vercel](https://vercel.com).
2. Set Framework Preset to **Vite** and Root Directory to **`client`** (or leave as root with the included `vercel.json`).
3. Click **Deploy**! No environment variables required.

---

## 📄 License & Attribution

Developed for computer vision classroom attendance and portfolio demonstration.
- **Repository**: [killeryt668-ops/AI_ATTENDANCE_MARKER](https://github.com/killeryt668-ops/AI_ATTENDANCE_MARKER)
