# UrbanShield AI — System Architecture Specification

## Architecture Overview
UrbanShield AI is built using a decoupled 3-tier architecture:
1. **Frontend Tier**: React + Vite + Tailwind CSS v4 + React Router + Lucide React + React Leaflet + Recharts.
2. **Backend API Tier**: FastAPI Python service handling validation, workflow orchestration, database storage, and GIS query filters.
3. **AI Service Tier**: Computer vision inference service returning predicted category, confidence, and severity scores.

## Data Flow Pipeline
```
[ Citizen Image + GPS ]
         │
         ▼
[ FastAPI Server ] ──► [ Object Storage (S3) ]
         │
         ▼
[ Vision Inference Engine ] (ResNet-50 / YOLO-v8)
         │
         ▼
[ Priority Scoring Engine ] ──► [ PostgreSQL DB ]
         │
         ▼
[ Authority Dashboard Queue & Map ]
         │
         ▼
[ Human Operator Verification ] ──► [ Municipal Squad Dispatch ]
```
