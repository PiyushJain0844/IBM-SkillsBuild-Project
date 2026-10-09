from pydantic import BaseModel
from typing import List, Optional

class DashboardSummaryResponse(BaseModel):
    totalActiveIssues: int
    highPriority: int
    awaitingVerification: int
    inProgress: int
    resolvedToday: int
    avgResolutionTime: str
    totalHistorical: int

class HotspotZoneItem(BaseModel):
    id: str
    name: str
    riskLevel: str
    riskScore: int
    topIssue: str
    issueCount: int
    avgSeverity: str
    avgResolutionTime: str
    trend: str
    recurringPattern: str
    predictedSurgeRisk: str = "High (AI Prediction)"

class HotspotsDashboardResponse(BaseModel):
    totalZones: int
    criticalHotspots: int
    zones: List[HotspotZoneItem]
