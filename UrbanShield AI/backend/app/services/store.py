from datetime import datetime
from typing import List, Dict, Any, Optional
from app.models.report import ReportCreateRequest
from app.services.cv_engine import cv_engine
from app.services.priority_engine import priority_engine

INITIAL_ZONES = [
  { "id": "Z-01", "name": "Zone 01 — North Commercial Market", "riskLevel": "High", "riskScore": 82, "topIssue": "Garbage Overflow", "issueCount": 48, "avgSeverity": "High", "avgResolutionTime": "14.2 hrs", "trend": "↑ +12%", "recurringPattern": "Weekend Market Spills" },
  { "id": "Z-02", "name": "Zone 02 — Central Business District", "riskLevel": "Critical", "riskScore": 89, "topIssue": "Road Damage", "issueCount": 64, "avgSeverity": "Critical", "avgResolutionTime": "8.5 hrs", "trend": "↑ +18%", "recurringPattern": "Monsoon Potholes & Transit Wear" },
  { "id": "Z-03", "name": "Zone 03 — West Campus & University", "riskLevel": "Low", "riskScore": 54, "topIssue": "Broken Streetlight", "issueCount": 22, "avgSeverity": "Medium", "avgResolutionTime": "24.0 hrs", "trend": "↓ -4%", "recurringPattern": "Night Corridor Dark Spots" },
  { "id": "Z-04", "name": "Zone 04 — South Residential Colony", "riskLevel": "High", "riskScore": 78, "topIssue": "Water Leakage", "issueCount": 39, "avgSeverity": "Critical", "avgResolutionTime": "18.4 hrs", "trend": "↑ +8%", "recurringPattern": "Old Pipe Main Bursting" },
  { "id": "Z-05", "name": "Zone 05 — East Industrial Estate", "riskLevel": "Medium", "riskScore": 68, "topIssue": "Garbage Overflow", "issueCount": 31, "avgSeverity": "Medium", "avgResolutionTime": "21.0 hrs", "trend": "→ 0%", "recurringPattern": "Industrial Waste Accumulation" },
  { "id": "Z-06", "name": "Zone 06 — Old Town Heritage Sector", "riskLevel": "High", "riskScore": 84, "topIssue": "Water Leakage", "issueCount": 42, "avgSeverity": "High", "avgResolutionTime": "16.8 hrs", "trend": "↑ +15%", "recurringPattern": "Drainage Overflow" },
  { "id": "Z-07", "name": "Zone 07 — Outer Ring Road Transit", "riskLevel": "Critical", "riskScore": 91, "topIssue": "Road Damage", "issueCount": 57, "avgSeverity": "Critical", "avgResolutionTime": "6.2 hrs", "trend": "↑ +22%", "recurringPattern": "Heavy Truck Axle Cracking" },
  { "id": "Z-08", "name": "Zone 08 — Waterfront Park & Promenade", "riskLevel": "Low", "riskScore": 41, "topIssue": "Fallen Tree / Obstruction", "issueCount": 15, "avgSeverity": "Low", "avgResolutionTime": "30.0 hrs", "trend": "↓ -10%", "recurringPattern": "Storm Branch Drops" },
  { "id": "Z-09", "name": "Zone 09 — Railway Station Corridor", "riskLevel": "High", "riskScore": 86, "topIssue": "Garbage Overflow", "issueCount": 51, "avgSeverity": "High", "avgResolutionTime": "11.5 hrs", "trend": "↑ +14%", "recurringPattern": "Passenger Footfall Trash" },
  { "id": "Z-10", "name": "Zone 10 — Suburb Tech Park", "riskLevel": "Low", "riskScore": 49, "topIssue": "Broken Streetlight", "issueCount": 19, "avgSeverity": "Medium", "avgResolutionTime": "19.0 hrs", "trend": "↓ -8%", "recurringPattern": "Service Lane Outages" }
]

INITIAL_TEAMS = [
  { "id": "T-01", "name": "Road Maintenance Team Alpha", "category": "Road Damage", "zone": "Zone 02", "activeIssues": 7, "capacity": 10, "leader": "Eng. Vikram Singh", "status": "Available" },
  { "id": "T-02", "name": "Sanitation Response Team", "category": "Garbage Overflow", "zone": "Zone 01", "activeIssues": 12, "capacity": 15, "leader": "Insp. Rajesh Kumar", "status": "Available" },
  { "id": "T-03", "name": "Water Maintenance Team North", "category": "Water Leakage", "zone": "Zone 04", "activeIssues": 5, "capacity": 8, "leader": "Eng. Anita Sharma", "status": "Available" },
  { "id": "T-04", "name": "Electrical Infrastructure Team", "category": "Broken Streetlight", "zone": "Zone 03", "activeIssues": 4, "capacity": 10, "leader": "Tech. Suresh Verma", "status": "Available" },
  { "id": "T-05", "name": "Horticulture Emergency Team", "category": "Fallen Tree / Obstruction", "zone": "Zone 08", "activeIssues": 2, "capacity": 6, "leader": "Supervisor Manoj Roy", "status": "Available" },
  { "id": "T-06", "name": "Road Maintenance Team South", "category": "Road Damage", "zone": "Zone 07", "activeIssues": 9, "capacity": 10, "leader": "Eng. Deepak Patel", "status": "Available" },
  { "id": "T-07", "name": "Drainage & Sanitation Team", "category": "Water Leakage", "zone": "Zone 06", "activeIssues": 6, "capacity": 8, "leader": "Insp. Sunita Devi", "status": "Available" },
  { "id": "T-08", "name": "Station Area Maintenance Team", "category": "Garbage Overflow", "zone": "Zone 09", "activeIssues": 8, "capacity": 12, "leader": "Supervisor Amit Roy", "status": "Available" }
]

INITIAL_ISSUES = [
  {
    "id": "US-1047",
    "category": "Road Damage",
    "title": "Severe Pothole & Asphalt Structural Cracking",
    "description": "Deep 14cm pothole forming near pedestrian crosswalk on main arterial transit avenue. Causes severe traffic deceleration and hazard during peak hours.",
    "image": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "zone": "Zone 02 — Central Business District",
    "address": "Connaught Place Radial Rd 3, New Delhi",
    "reportedBy": "Piyush Jain (Citizen)",
    "reportedAt": "2026-10-08T13:45:00Z",
    "aiPrediction": "Road Damage",
    "aiConfidence": 0.94,
    "severity": "Critical",
    "priorityScore": 96,
    "status": "Verified",
    "assignedTeam": "Road Maintenance Team Alpha",
    "verifiedBy": "Operator #402 (Municipal Ops)",
    "verifiedAt": "2026-10-08T14:30:00Z",
    "resolvedAt": None,
    "resolutionTimeHrs": None,
    "recurrenceCount": 4,
    "aiReasoning": "Deep surface depth anomaly (> 12cm) detected near high footfall arterial junction.",
    "recommendedNextAction": "Deploy rapid cold-asphalt patch crew before evening rush hour.",
    "history": [
      { "status": "Submitted", "timestamp": "2026-10-08T13:45:00Z", "actor": "Citizen (App)", "notes": "Logged photo & GPS pin." },
      { "status": "AI Analysis", "timestamp": "2026-10-08T13:45:10Z", "actor": "UrbanShield Vision Engine v0.3", "notes": "Road Damage detected (94% confidence). Priority: 96/100." },
      { "status": "Verified", "timestamp": "2026-10-08T14:30:00Z", "actor": "Operator #402", "notes": "Confirmed depth hazard." }
    ]
  },
  {
    "id": "US-1048",
    "category": "Garbage Overflow",
    "title": "Commercial Dumpster Overflow & Plastic Waste Spill",
    "description": "Public commercial bin overflowing with plastic packaging and cardboard spilling 5 meters onto sidewalk.",
    "image": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop",
    "latitude": 28.6315,
    "longitude": 77.2167,
    "zone": "Zone 01 — North Commercial Market",
    "address": "Block B, Karol Bagh Market, New Delhi",
    "reportedBy": "Ananya Sharma (Resident)",
    "reportedAt": "2026-10-08T15:10:00Z",
    "aiPrediction": "Garbage Overflow",
    "aiConfidence": 0.91,
    "severity": "High",
    "priorityScore": 84,
    "status": "Pending Verification",
    "assignedTeam": "Sanitation Response Team",
    "verifiedBy": None,
    "verifiedAt": None,
    "resolvedAt": None,
    "resolutionTimeHrs": None,
    "recurrenceCount": 6,
    "aiReasoning": "High volume of uncollected waste detected outside bin perimeter (> 75% overflow ratio).",
    "recommendedNextAction": "Schedule priority waste compactor truck within 2 hours.",
    "history": [
      { "status": "Submitted", "timestamp": "2026-10-08T15:10:00Z", "actor": "Citizen (App)", "notes": "Report submitted." },
      { "status": "AI Analysis", "timestamp": "2026-10-08T15:10:08Z", "actor": "UrbanShield Vision Engine v0.3", "notes": "Garbage Overflow (91% confidence)." }
    ]
  },
  {
    "id": "US-1049",
    "category": "Water Leakage",
    "title": "Underground Pipe Main Burst & Surface Inundation",
    "description": "Pressurized drinking water gushing from pipe joint, flooding pedestrian walkway and basement access ramp.",
    "image": "https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=800&auto=format&fit=crop",
    "latitude": 28.5921,
    "longitude": 77.2269,
    "zone": "Zone 04 — South Residential Colony",
    "address": "Lajpat Nagar Ring Road, New Delhi",
    "reportedBy": "Rohan Verma (Citizen)",
    "reportedAt": "2026-10-08T11:30:00Z",
    "aiPrediction": "Water Leakage",
    "aiConfidence": 0.88,
    "severity": "Critical",
    "priorityScore": 92,
    "status": "Assigned",
    "assignedTeam": "Water Maintenance Team North",
    "verifiedBy": "Inspector #108 (Water Board)",
    "verifiedAt": "2026-10-08T12:00:00Z",
    "resolvedAt": None,
    "resolutionTimeHrs": None,
    "recurrenceCount": 3,
    "aiReasoning": "Continuous water pooling visual pattern near municipal main valve.",
    "recommendedNextAction": "Isolate main valve line #4 and dispatch repair crew.",
    "history": [
      { "status": "Submitted", "timestamp": "2026-10-08T11:30:00Z", "actor": "Citizen (App)", "notes": "Logged report." },
      { "status": "AI Analysis", "timestamp": "2026-10-08T11:30:05Z", "actor": "UrbanShield Vision Engine v0.3", "notes": "Water Leakage (88%)." },
      { "status": "Verified", "timestamp": "2026-10-08T12:00:00Z", "actor": "Inspector #108", "notes": "Verified main pipe burst." },
      { "status": "Assigned", "timestamp": "2026-10-08T12:15:00Z", "actor": "Inspector #108", "notes": "Assigned to Water Maintenance Team North." }
    ]
  },
  {
    "id": "US-1050",
    "category": "Broken Streetlight",
    "title": "Damaged Light Pole & Dark Pedestrian Corridor",
    "description": "Streetlight fixture hanging loosely with exposed wiring; bulb dark for 3 consecutive nights.",
    "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop",
    "latitude": 28.5456,
    "longitude": 77.1928,
    "zone": "Zone 03 — West Campus & University",
    "address": "IIT Flyover Service Lane, Hauz Khas",
    "reportedBy": "Meera Das (Student)",
    "reportedAt": "2026-10-07T17:40:00Z",
    "aiPrediction": "Broken Streetlight",
    "aiConfidence": 0.95,
    "severity": "Medium",
    "priorityScore": 68,
    "status": "In Progress",
    "assignedTeam": "Electrical Infrastructure Team",
    "verifiedBy": "Operator #210 (Electrical)",
    "verifiedAt": "2026-10-07T18:00:00Z",
    "resolvedAt": None,
    "resolutionTimeHrs": None,
    "recurrenceCount": 2,
    "aiReasoning": "Hardware tilt detected + zero optical sensor luminance output.",
    "recommendedNextAction": "Replace LED driver module and inspect line voltage.",
    "history": [
      { "status": "Submitted", "timestamp": "2026-10-07T17:40:00Z", "actor": "Student (App)", "notes": "Logged dark spot." },
      { "status": "AI Analysis", "timestamp": "2026-10-07T17:40:06Z", "actor": "UrbanShield Vision Engine v0.3", "notes": "Broken Streetlight (95%)." },
      { "status": "In Progress", "timestamp": "2026-10-08T09:00:00Z", "actor": "Electrical Unit 4", "notes": "Hydraulic bucket truck deployed." }
    ]
  },
  {
    "id": "US-1051",
    "category": "Fallen Tree / Obstruction",
    "title": "Large Storm Branch Blocking Traffic Lane",
    "description": "Thunderstorm caused heavy bough to snap, blocking one lane of vehicular traffic near school zone.",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    "latitude": 28.5800,
    "longitude": 77.2300,
    "zone": "Zone 08 — Waterfront Park & Promenade",
    "address": "Defence Colony Main Ave, New Delhi",
    "reportedBy": "Karan Gupta (Citizen)",
    "reportedAt": "2026-10-06T08:15:00Z",
    "aiPrediction": "Fallen Tree / Obstruction",
    "aiConfidence": 0.92,
    "severity": "High",
    "priorityScore": 79,
    "status": "Resolved",
    "assignedTeam": "Horticulture Emergency Team",
    "verifiedBy": "Inspector #305",
    "verifiedAt": "2026-10-06T10:00:00Z",
    "resolvedAt": "2026-10-06T13:45:00Z",
    "resolutionTimeHrs": 5.5,
    "recurrenceCount": 1,
    "aiReasoning": "Dense foliage object obstructing vehicular transit corridor.",
    "recommendedNextAction": "Cut timber and restore clear road lane.",
    "history": [
      { "status": "Submitted", "timestamp": "2026-10-06T08:15:00Z", "actor": "Resident (App)", "notes": "Logged tree fall." },
      { "status": "Resolved", "timestamp": "2026-10-06T13:45:00Z", "actor": "Horticulture Team", "notes": "Timber removed, road fully cleared." }
    ]
  }
]

class ReportStore:
    def __init__(self):
        self.issues: List[Dict[str, Any]] = [dict(i) for i in INITIAL_ISSUES]
        self.zones: List[Dict[str, Any]] = [dict(z) for z in INITIAL_ZONES]
        self.teams: List[Dict[str, Any]] = [dict(t) for t in INITIAL_TEAMS]

    def list_reports(
        self,
        category: Optional[str] = None,
        severity: Optional[str] = None,
        status: Optional[str] = None,
        zone: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        results = list(self.issues)

        if category and category != "All":
            results = [r for r in results if r.get("category") == category]

        if severity and severity != "All":
            results = [r for r in results if r.get("severity") == severity]

        if status and status != "All":
            if status == "Pending Verification":
                results = [r for r in results if r.get("status") in ("Pending Verification", "Submitted")]
            else:
                results = [r for r in results if r.get("status") == status]

        if zone and zone != "All":
            results = [r for r in results if zone.lower() in r.get("zone", "").lower()]

        if search:
            q = search.lower()
            results = [
                r for r in results
                if q in r.get("id", "").lower() or q in r.get("title", "").lower() or q in r.get("zone", "").lower()
            ]

        # Sort by priority score descending
        results.sort(key=lambda x: x.get("priorityScore", 0), reverse=True)
        return results

    def get_report_by_id(self, report_id: str) -> Optional[Dict[str, Any]]:
        for r in self.issues:
            if r.get("id") == report_id:
                return r
        return None

    def create_report(self, req: ReportCreateRequest) -> Dict[str, Any]:
        new_id = f"US-{1052 + len(self.issues) - 5}"
        now_iso = datetime.utcnow().isoformat() + "Z"

        # Execute Computer Vision Triage
        ai_pred, ai_conf, ai_reason, rec_action = cv_engine.classify_image(category_hint=req.category)

        # Calculate Multi-Factor Priority Score
        priority_score = priority_engine.calculate_score(
            ai_confidence=ai_conf,
            severity=req.severity or "High",
            recurrence_count=1,
            report_age_hours=0.1
        )

        title = req.title or f"Reported {req.category or 'Civic Defect'}"

        new_issue = {
            "id": new_id,
            "category": req.category or "Road Damage",
            "title": title,
            "description": req.description or "Citizen reported issue.",
            "image": req.image or "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
            "latitude": req.latitude,
            "longitude": req.longitude,
            "zone": req.zone or "Zone 02 — Central Business District",
            "address": req.address or "City Center",
            "reportedBy": req.reportedBy or "Citizen (App)",
            "reportedAt": now_iso,
            "aiPrediction": ai_pred,
            "aiConfidence": ai_conf,
            "severity": req.severity or "High",
            "priorityScore": priority_score,
            "status": "Pending Verification",
            "assignedTeam": None,
            "verifiedBy": None,
            "verifiedAt": None,
            "resolvedAt": None,
            "resolutionTimeHrs": None,
            "recurrenceCount": 1,
            "aiReasoning": ai_reason,
            "recommendedNextAction": rec_action,
            "history": [
                { "status": "Submitted", "timestamp": now_iso, "actor": req.reportedBy or "Citizen", "notes": "Report logged." },
                { "status": "AI Analysis", "timestamp": now_iso, "actor": "UrbanShield Vision Engine v0.3", "notes": f"AI Triaged ({int(ai_conf*100)}% confidence). Priority: {priority_score}/100." }
            ]
        }

        self.issues.insert(0, new_issue)
        return new_issue

    def verify_report(self, report_id: str, operator_name: str = "Operator A. Sharma", notes: str = None) -> Optional[Dict[str, Any]]:
        report = self.get_report_by_id(report_id)
        if not report:
            return None

        now_iso = datetime.utcnow().isoformat() + "Z"
        report["status"] = "Verified"
        report["verifiedBy"] = operator_name
        report["verifiedAt"] = now_iso

        note_text = notes or f"Human verification confirmed AI prediction ({report.get('aiPrediction')})."
        report["history"].append({
            "status": "Verified",
            "timestamp": now_iso,
            "actor": operator_name,
            "notes": note_text
        })
        return report

    def update_status(self, report_id: str, status: str, assigned_team: Optional[str] = None, notes: Optional[str] = None) -> Optional[Dict[str, Any]]:
        report = self.get_report_by_id(report_id)
        if not report:
            return None

        now_iso = datetime.utcnow().isoformat() + "Z"
        report["status"] = status
        if assigned_team:
            report["assignedTeam"] = assigned_team

        if status == "Resolved":
            report["resolvedAt"] = now_iso
            report["resolutionTimeHrs"] = 4.8

        note_text = notes or (f"Assigned to {assigned_team}" if assigned_team else f"Status updated to {status}")
        report["history"].append({
            "status": status,
            "timestamp": now_iso,
            "actor": "Authority Workspace Operator",
            "notes": note_text
        })
        return report

    def get_summary_stats(self) -> Dict[str, Any]:
        total = len(self.issues)
        active = len([r for r in self.issues if r.get("status") != "Resolved"])
        critical = len([r for r in self.issues if r.get("severity") == "Critical" and r.get("status") != "Resolved"])
        awaiting = len([r for r in self.issues if r.get("status") in ("Pending Verification", "Submitted")])
        in_prog = len([r for r in self.issues if r.get("status") in ("In Progress", "Assigned")])
        resolved_today = len([r for r in self.issues if r.get("status") == "Resolved"])

        return {
            "totalActiveIssues": active,
            "highPriority": critical,
            "awaitingVerification": awaiting,
            "inProgress": in_prog,
            "resolvedToday": resolved_today,
            "avgResolutionTime": "4.8 Hours (Simulated Pilot Data)",
            "totalHistorical": total
        }

    def get_hotspots_dashboard(self) -> Dict[str, Any]:
        critical_count = len([z for z in self.zones if z.get("riskLevel") == "Critical"])
        return {
            "totalZones": len(self.zones),
            "criticalHotspots": critical_count,
            "zones": self.zones
        }

store = ReportStore()
