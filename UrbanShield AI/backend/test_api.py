import sys
from app.main import app
from app.models.report import ReportCreateRequest, ReportVerifyRequest, ReportStatusUpdateRequest
from app.routers.reports import get_reports, get_report_details, create_report, verify_report, update_report_status
from app.routers.dashboard import get_dashboard_summary, get_dashboard_hotspots

def run_tests():
    print("=== URBANSHIELD AI BACKEND DIRECT FUNCTION TEST SUITE ===")

    # 1. Root Health Check
    from app.main import root_health_check
    health = root_health_check()
    assert health["status"] == "online"
    print("[OK] GET / -> Status:", health["status"], "| Service:", health["service"])

    # 2. GET /api/reports
    reports = get_reports(category=None, severity=None, status=None, zone=None, search=None)
    assert len(reports) >= 5
    print(f"[OK] GET /api/reports -> Returned {len(reports)} initial reports")

    # 3. GET /api/reports/US-1047
    report = get_report_details("US-1047")
    assert report["id"] == "US-1047"
    assert "history" in report
    print(f"[OK] GET /api/reports/US-1047 -> Found: '{report['title']}' | Priority Score: {report['priorityScore']}")

    # 4. POST /api/reports
    req = ReportCreateRequest(
        category="Road Damage",
        title="Severe Pothole Test on Highway",
        description="Deep asphalt cracking hazard.",
        latitude=28.6139,
        longitude=77.2090,
        zone="Zone 02 — Central Business District",
        address="Main Transit Highway",
        reportedBy="Piyush Jain (Citizen)",
        severity="Critical"
    )
    created = create_report(req)
    assert created["id"].startswith("US-")
    assert created["priorityScore"] > 0
    print(f"[OK] POST /api/reports -> Created ID {created['id']} | Priority Score: {created['priorityScore']} | AI Prediction: {created['aiPrediction']}")

    # 5. PATCH /api/reports/US-1047/verify
    v_req = ReportVerifyRequest(operatorName="Operator A. Sharma", notes="Confirmed depth hazard.")
    verified = verify_report("US-1047", v_req)
    assert verified["verifiedBy"] == "Operator A. Sharma"
    assert verified["status"] == "Verified"
    print(f"[OK] PATCH /api/reports/US-1047/verify -> Verified by {verified['verifiedBy']} | Status: {verified['status']}")

    # 6. PATCH /api/reports/US-1047/status
    s_req = ReportStatusUpdateRequest(status="Assigned", assignedTeam="Road Maintenance Team Alpha", notes="Assigned priority repair crew.")
    updated = update_report_status("US-1047", s_req)
    assert updated["status"] == "Assigned"
    assert updated["assignedTeam"] == "Road Maintenance Team Alpha"
    print(f"[OK] PATCH /api/reports/US-1047/status -> Status: {updated['status']} | Team: {updated['assignedTeam']}")

    # 7. GET /api/dashboard/summary
    summary = get_dashboard_summary()
    assert summary["totalActiveIssues"] > 0
    print(f"[OK] GET /api/dashboard/summary -> Active Issues: {summary['totalActiveIssues']} | Critical: {summary['highPriority']}")

    # 8. GET /api/dashboard/hotspots
    hotspots = get_dashboard_hotspots()
    assert hotspots["totalZones"] == 10
    print(f"[OK] GET /api/dashboard/hotspots -> Total Zones: {hotspots['totalZones']} | Critical Hotspots: {hotspots['criticalHotspots']}")

    print("\nALL 8 BACKEND API ENDPOINT TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    run_tests()
