# UrbanShield AI — Backend Service Specification

## Overview
FastAPI Python service for managing civic reports, executing computer vision model inference, calculating multi-factor priority scores, and serving GIS dashboard endpoints.

## Core Endpoints
- `POST /api/reports` — Submit report image + location, execute CV triage, create priority score.
- `GET /api/reports` — Query reports with category, severity, and status filters.
- `GET /api/reports/:id` — Retrieve detailed report record with timeline audit history.
- `PATCH /api/reports/:id/verify` — Confirm AI classification (Operator Human Verification).
- `PATCH /api/reports/:id/status` — Assign squad and update resolution workflow status.
- `GET /api/dashboard/summary` — Aggregate KPI stats, total reports, critical issues, avg resolution.
- `GET /api/dashboard/hotspots` — Geospatial cluster risk scores and zone statistics.

## Environment Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pydantic torch torchvision pillow
uvicorn app.main:app --reload --port 8000
```
