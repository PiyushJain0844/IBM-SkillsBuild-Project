from fastapi import APIRouter
from app.models.dashboard import DashboardSummaryResponse, HotspotsDashboardResponse
from app.services.store import store

router = APIRouter(prefix="/dashboard", tags=["Dashboard Intelligence"])

@router.get("/summary", response_model=DashboardSummaryResponse)
def get_dashboard_summary():
    """
    Get aggregate KPI statistics for Authority Overview dashboard:
    Total active issues, critical/high priority, awaiting verification, in progress, resolved today, average resolution time.
    """
    return store.get_summary_stats()

@router.get("/hotspots", response_model=HotspotsDashboardResponse)
def get_dashboard_hotspots():
    """
    Get geospatial predictive cluster risk scores and municipal zone statistics (Predictive Civic Hotspots & Civic DNA).
    """
    return store.get_hotspots_dashboard()
