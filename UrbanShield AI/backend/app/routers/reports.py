from fastapi import APIRouter, HTTPException, Query, UploadFile, File, Form
from typing import Optional, List
from app.models.report import (
    ReportCreateRequest,
    ReportVerifyRequest,
    ReportStatusUpdateRequest,
    ReportResponse
)
from app.services.store import store

router = APIRouter(prefix="/reports", tags=["Civic Reports"])

@router.get("", response_model=List[ReportResponse])
def get_reports(
    category: Optional[str] = Query(None, description="Filter by defect category"),
    severity: Optional[str] = Query(None, description="Filter by severity level"),
    status: Optional[str] = Query(None, description="Filter by status"),
    zone: Optional[str] = Query(None, description="Filter by municipal zone"),
    search: Optional[str] = Query(None, description="Search term for ID, title, address")
):
    """
    Query all civic reports with optional filtering by category, severity, status, zone, and search text.
    Returns array of report records sorted by priority score descending.
    """
    return store.list_reports(
        category=category,
        severity=severity,
        status=status,
        zone=zone,
        search=search
    )

@router.get("/{id}", response_model=ReportResponse)
def get_report_details(id: str):
    """
    Retrieve detailed civic report record by ID including explainable AI reasoning and timeline audit history.
    """
    report = store.get_report_by_id(id)
    if not report:
        raise HTTPException(status_code=404, detail=f"Civic Report with ID '{id}' not found.")
    return report

@router.post("", response_model=ReportResponse, status_code=201)
def create_report(req: ReportCreateRequest):
    """
    Submit a new citizen civic report.
    Executes Computer Vision model inference, calculates multi-factor priority score, and records audit history.
    """
    new_report = store.create_report(req)
    return new_report

@router.patch("/{id}/verify", response_model=ReportResponse)
def verify_report(id: str, req: ReportVerifyRequest):
    """
    Confirm/verify AI classification (Operator Human Verification).
    Updates status to 'Verified', records operator verification timestamp, and logs audit entry.
    """
    updated = store.verify_report(
        report_id=id,
        operator_name=req.operatorName or "Operator A. Sharma",
        notes=req.notes
    )
    if not updated:
        raise HTTPException(status_code=404, detail=f"Civic Report with ID '{id}' not found.")
    return updated

@router.patch("/{id}/status", response_model=ReportResponse)
def update_report_status(id: str, req: ReportStatusUpdateRequest):
    """
    Assign operational field team and update resolution workflow status.
    Updates issue workflow status ('Verified', 'Assigned', 'In Progress', 'Resolved') and logs timeline entry.
    """
    updated = store.update_status(
        report_id=id,
        status=req.status,
        assigned_team=req.assignedTeam,
        notes=req.notes
    )
    if not updated:
        raise HTTPException(status_code=404, detail=f"Civic Report with ID '{id}' not found.")
    return updated
