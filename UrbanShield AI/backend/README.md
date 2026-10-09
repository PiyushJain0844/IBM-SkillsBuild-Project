# UrbanShield AI — Backend Service Specification

## Overview
FastAPI Python service for managing civic reports, executing computer vision model inference, calculating multi-factor priority scores, and serving GIS dashboard endpoints.

## Core Endpoints
- `POST /api/reports` — Submit report image + location, execute CV triage, create priority score.
- `GET /api/reports` — Query reports with category, severity, and status filters.
- `GET /api/reports/{id}` — Retrieve detailed report record with timeline audit history.
- `PATCH /api/reports/{id}/verify` — Confirm AI classification (Operator Human Verification).
- `PATCH /api/reports/{id}/status` — Assign operational field team and update resolution workflow status.
- `GET /api/dashboard/summary` — Aggregate KPI stats, total reports, critical issues, avg resolution.
- `GET /api/dashboard/hotspots` — Geospatial cluster risk scores and zone statistics.

## Environment Setup & Local Execution
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Running Automated Test Suite
```bash
python test_api.py
```

## API Documentation & Interactive Swagger UI
Once running, open:
- Swagger Interactive UI: `http://localhost:8000/docs`
- ReDoc UI: `http://localhost:8000/redoc`
