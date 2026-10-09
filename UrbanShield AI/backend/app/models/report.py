from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class TimelineHistoryEntry(BaseModel):
    status: str
    timestamp: str
    actor: str
    notes: str

class ReportCreateRequest(BaseModel):
    category: Optional[str] = "Road Damage"
    title: Optional[str] = None
    description: Optional[str] = "Citizen reported civic issue."
    image: Optional[str] = "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop"
    latitude: float = 28.6139
    longitude: float = 77.2090
    zone: Optional[str] = "Zone 02 — Central Business District"
    address: Optional[str] = "Sector 14, City Center"
    reportedBy: Optional[str] = "Piyush Jain (Citizen)"
    severity: Optional[str] = "High"

class ReportVerifyRequest(BaseModel):
    operatorName: Optional[str] = "Operator A. Sharma"
    notes: Optional[str] = "Confirmed AI classification prediction."

class ReportStatusUpdateRequest(BaseModel):
    status: str
    assignedTeam: Optional[str] = None
    notes: Optional[str] = None

class ReportResponse(BaseModel):
    id: str
    category: str
    title: str
    description: str
    image: str
    latitude: float
    longitude: float
    zone: str
    address: str
    reportedBy: str
    reportedAt: str
    aiPrediction: str
    aiConfidence: float
    severity: str
    priorityScore: int
    status: str
    assignedTeam: Optional[str] = None
    verifiedBy: Optional[str] = None
    verifiedAt: Optional[str] = None
    resolvedAt: Optional[str] = None
    resolutionTimeHrs: Optional[float] = None
    recurrenceCount: int = 1
    aiReasoning: str
    recommendedNextAction: str
    history: List[TimelineHistoryEntry]
