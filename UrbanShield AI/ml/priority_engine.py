"""
UrbanShield AI — Multi-Factor Priority Score Engine
Calculates civic priority scores using explainable algorithmic weighting:

priority_score = (
    (vision_confidence * 0.40) +
    (severity_weight * 0.30) +
    (zone_recurrence_factor * 0.20) +
    (report_age_hours * 0.10)
) * 100
"""

class PriorityEngine:
    SEVERITY_WEIGHTS = {
        "Critical": 1.00,
        "High": 0.75,
        "Medium": 0.50,
        "Low": 0.25
    }

    @classmethod
    def calculate_priority_score(
        cls,
        vision_confidence: float,
        severity: str,
        recurrence_count: int = 1,
        report_age_hours: float = 1.0
    ) -> dict:
        """
        Calculates total priority score (0 - 100) and returns detailed component breakdown.
        """
        # 1. Vision Confidence Weight (40%)
        conf = min(max(vision_confidence, 0.0), 1.0)
        vision_component = conf * 0.40

        # 2. Severity Weight (30%)
        sev_val = cls.SEVERITY_WEIGHTS.get(severity, 0.50)
        severity_component = sev_val * 0.30

        # 3. Zone Recurrence Factor (20%) - capped at 5 occurrences = 1.0
        rec_factor = min(recurrence_count / 5.0, 1.0)
        recurrence_component = rec_factor * 0.20

        # 4. Report Age Hours Factor (10%) - capped at 24 hours = 1.0
        age_factor = min(report_age_hours / 24.0, 1.0)
        age_component = age_factor * 0.10

        raw_total = (vision_component + severity_component + recurrence_component + age_component) * 100
        final_score = int(round(raw_total))
        final_score = min(max(final_score, 10), 99)

        return {
            "priorityScore": final_score,
            "breakdown": {
                "visionConfidencePoints": round(vision_component * 100, 1),
                "severityPoints": round(severity_component * 100, 1),
                "recurrencePoints": round(recurrence_component * 100, 1),
                "reportAgePoints": round(age_component * 100, 1)
            },
            "weightingMethodology": "Demo weighting methodology (Subject to empirical validation)"
        }
