# UrbanShield AI — Data & Privacy Governance Plan

## Data Architecture
- `data/raw/` — Original source datasets (TrashNet, RDD2022, OpenStreetMap).
- `data/interim/` — Normalized and quality-checked images.
- `data/processed/` — Train / Validation / Test splits with label metadata.
- `data/metadata/` — Label schema, licenses, data dictionary.

## Privacy & Ethics Controls
1. **Visual Privacy**: Automated blurring/redaction of human facial features and vehicle license plates.
2. **Minimization**: Collection restricted strictly to evidence photo + GPS pin + defect description.
3. **Access Controls**: Role-based access control separating public citizen views from municipal operator controls.
