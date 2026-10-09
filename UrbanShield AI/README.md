# UrbanShield AI
> **From Citizen Complaints to Predictive Civic Action**

![SDG 11 Alignment](https://img.shields.io/badge/SDG%2011-Sustainable%20Cities%20%26%20Communities-blue?style=for-the-badge)
![IBM SkillsBuild](https://img.shields.io/badge/IBM%20SkillsBuild-Applied%20AI%20Internship-050B14?style=for-the-badge)
![Human-in-the-Loop](https://img.shields.io/badge/Responsible%20AI-Human--in--the--Loop-emerald?style=for-the-badge)

UrbanShield AI is a competition-ready AI civic intelligence platform designed for the **IBM SkillsBuild Machine Learning & Applied AI Internship**. Aligned with **UN Sustainable Development Goal 11 (Sustainable Cities & Communities)**, it transforms raw citizen complaint reports into prioritized, actionable geospatial intelligence for municipal operators.

---

## 🎨 Architectural & Visual Identity

### 1. Role-Based Architecture (Citizen vs. Authority)
UrbanShield AI separates the user experience into two distinct jobs-to-be-done:
- **Citizen Experience (`/citizen`)**: Simple, action-oriented portal focused on submitting complaint photos, attaching GPS pins, tracking status, and viewing community defects.
- **Authority Experience (`/authority`)**: High-density operational command center focused on priority queues, live GIS maps, field squad assignments, predictive hotspots, and Civic DNA profiling.

### 2. Light Civic-Tech Visual System
- **Background**: Light, clean slate `#F8FAFC` background with subtle city grid pattern overlays.
- **Cards & Typography**: Crisp white `#FFFFFF` cards with subtle borders (`#E2E8F0`), restrained shadows, and dark slate typography (`#0F172A`).
- **Accents**: Civic Blue (`#2563EB`), Teal (`#0F766E`), Emerald Green (`#16A34A`), Amber (`#D97706`), and Rose (`#DC2626`).

---

## 🔒 Demo Credentials & Role Selection

- **Citizen Demo Account**: `citizen@demo.urbanshield.ai` (Password: `demo1234`)
- **Authority Operator Demo**: `authority@demo.urbanshield.ai` (Password: `demo1234`)
- **Role Selector**: Accessible at `/select-role`

---

## 📊 Central Interconnected Demo Dataset

All KPIs, priority queues, maps, analytics, citizen complaints, and field squad workloads derive dynamically from a single central data store (`src/data/centralStore.js`). Submitting a complaint or updating an issue status reactively updates the entire application in real time.

---

## 🛡️ Responsible AI Governance

1. **Human-in-the-Loop Verification**: AI predictions are explicitly tagged `AI PREDICTED — Requires Human Verification`. Critical dispatch actions require explicit operator confirmation via confirmation modals.
2. **Evaluation Metrics Rules**: Machine learning accuracy and F1 metrics are explicitly labeled **"Awaiting Measured Validation Data"** in accordance with IBM SkillsBuild competition rules.

---

## 🚀 Local Run & Build Instructions

```bash
# 1. Navigate to frontend
cd "UrbanShield AI/frontend"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Production build
npm run build
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
