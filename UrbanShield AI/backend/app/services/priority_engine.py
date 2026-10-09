class PriorityScoreEngine:
    """
    Multi-Factor Civic Priority Score Calculation Engine.
    Implements UrbanShield AI multi-criteria ranking formulation:
    
    priority_score = (
        (vision_confidence * 0.40) +
        (severity_weight * 0.30) +
        (zone_recurrence_factor * 0.20) +
        (report_age_hours * 0.10)
    ) * 100
    """

    SEVERITY_WEIGHTS = {
        "Critical": 1.00,
        "High": 0.75,
        "Medium": 0.50,
        "Low": 0.25
    }

    @classmethod
    def calculate_score(
        cls,
        ai_confidence: float = 0.94,
        severity: str = "High",
        recurrence_count: int = 2,
        report_age_hours: float = 1.0
    ) -> int:
        # 1. Vision Confidence Weight (40%)
        conf_weight = min(max(ai_confidence, 0.0), 1.0) * 0.40

        # 2. Severity Weight (30%)
        sev_val = cls.SEVERITY_WEIGHTS.get(severity, 0.50)
        sev_weight = sev_val * 0.30

        # 3. Zone Recurrence Factor (20%) - normalized (count >= 5 -> 1.0)
        recurrence_factor = min(recurrence_count / 5.0, 1.0) * 0.20

        # 4. Report Age Factor (10%) - normalized (age >= 24h -> 1.0)
        age_factor = min(report_age_hours / 24.0, 1.0) * 0.10

        raw_score = (conf_weight + sev_weight + recurrence_factor + age_factor) * 100
        final_score = int(round(raw_score))

        # Clamp between 10 and 99
        return min(max(final_score, 10), 99)

priority_engine = PriorityScoreEngine()
