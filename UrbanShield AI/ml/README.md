# UrbanShield AI — Machine Learning Specification

## Model Architecture
Multi-class Computer Vision classifier trained to detect municipal infrastructure defects:
1. **Waste Overflow** (uncollected bin refuse, street trash spills)
2. **Road Damage** (asphalt potholes, surface cracking, sinkholes)
3. **Water Leakage** (burst water mains, street pipe surface flooding)
4. **Broken Streetlight** (dark fixtures, damaged lighting poles)
5. **Fallen Tree / Obstruction** (storm timber blocking traffic lanes)

## Priority Scoring Formulation
```python
priority_score = (
    (vision_confidence * 0.40) +
    (severity_weight * 0.30) +
    (zone_recurrence_factor * 0.20) +
    (report_age_hours * 0.10)
) * 100
```

## Responsible AI Evaluation Standard
In accordance with IBM SkillsBuild competition guidelines, evaluation metrics (Accuracy, Macro F1, Recall, Precision) are marked **"Awaiting Measured Evaluation Results"** until evaluated on a verified, held-out validation test split. No metrics are fabricated.
