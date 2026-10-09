// UrbanShield AI — Mock Service & Data Store
// DEMO DATA — Used for client-side demonstration when API is offline.
// Note: All ML accuracy/F1 evaluation numbers are placeholders marked as "Not Measured Yet" in compliance with Responsible AI requirements.

export const INITIAL_REPORTS = [
  {
    id: "US-1047",
    category: "Road Damage",
    title: "Severe Pothole & Asphalt Cracking",
    description: "Deep pothole forming on the main transit avenue near the crosswalk. High traffic risk during peak hours.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
    latitude: 28.6139,
    longitude: 77.2090,
    zone: "Zone 02 — Central District",
    address: "Connaught Place Radial Rd 3, New Delhi",
    predictedCategory: "Road Damage",
    confidence: 0.94,
    severity: "Critical", // Critical, High, Medium, Low
    priorityScore: 96,
    status: "Verified", // Submitted, AI Triaged, Pending Verification, Verified, Assigned, In Progress, Resolved
    isVerifiedByHuman: true,
    verifiedBy: "Operator #402 (Municipal Ops)",
    verifiedAt: "2026-10-08T14:30:00Z",
    assignedTo: "Road & Infrastructure Team B",
    assignedAt: "2026-10-08T15:00:00Z",
    createdAt: "2026-10-08T13:45:00Z",
    updatedAt: "2026-10-08T15:00:00Z",
    aiReasoning: "Large structural asphalt degradation detected with surface depth index > 12cm near high footfall junction.",
    recommendedNextAction: "Dispatch emergency road repair crew to apply temporary cold patch before evening traffic peak.",
    history: [
      { status: "Submitted", timestamp: "2026-10-08T13:45:00Z", actor: "Citizen (App)", notes: "Report logged with photo & geo-pin." },
      { status: "AI Triaged", timestamp: "2026-10-08T13:45:10Z", actor: "UrbanShield Vision Engine v1.2", notes: "Classification: Road Damage (94% confidence). Priority: 96/100." },
      { status: "Verified", timestamp: "2026-10-08T14:30:00Z", actor: "Operator #402", notes: "Confirmed pothole depth & high traffic risk." },
      { status: "Assigned", timestamp: "2026-10-08T15:00:00Z", actor: "Operator #402", notes: "Assigned to Road & Infrastructure Team B." }
    ]
  },
  {
    id: "US-1048",
    category: "Waste Overflow",
    title: "Garbage Dump Overflow at Commercial Market",
    description: "Public bin overflowing with plastic packaging, organic waste, and cardboard boxes spilling onto the sidewalk.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop",
    latitude: 28.6315,
    longitude: 77.2167,
    zone: "Zone 01 — North Market",
    address: "Block B, Karol Bagh Market, New Delhi",
    predictedCategory: "Waste Overflow",
    confidence: 0.91,
    severity: "High",
    priorityScore: 84,
    status: "Pending Verification",
    isVerifiedByHuman: false,
    verifiedBy: null,
    verifiedAt: null,
    assignedTo: null,
    assignedAt: null,
    createdAt: "2026-10-08T15:10:00Z",
    updatedAt: "2026-10-08T15:10:00Z",
    aiReasoning: "High volume of uncollected waste detected outside bin bounds (> 75% overflow ratio).",
    recommendedNextAction: "Schedule priority waste collection compactor truck within 2 hours.",
    history: [
      { status: "Submitted", timestamp: "2026-10-08T15:10:00Z", actor: "Resident (App)", notes: "Report logged." },
      { status: "AI Triaged", timestamp: "2026-10-08T15:10:08Z", actor: "UrbanShield Vision Engine v1.2", notes: "Classification: Waste Overflow (91% confidence)." }
    ]
  },
  {
    id: "US-1049",
    category: "Water Leakage",
    title: "Burst Water Main & Surface Flooding",
    description: "Pressurized clean water leaking from underground pipe joint, flooding pavement and entering basement entryway.",
    image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=800&auto=format&fit=crop",
    latitude: 28.5921,
    longitude: 77.2269,
    zone: "Zone 04 — South Residential",
    address: "Lajpat Nagar Ring Road, New Delhi",
    predictedCategory: "Water Leakage",
    confidence: 0.88,
    severity: "Critical",
    priorityScore: 92,
    status: "Assigned",
    isVerifiedByHuman: true,
    verifiedBy: "Inspector #108 (Water Board)",
    verifiedAt: "2026-10-08T12:00:00Z",
    assignedTo: "Jal Board Rapid Response Team 1",
    assignedAt: "2026-10-08T12:15:00Z",
    createdAt: "2026-10-08T11:30:00Z",
    updatedAt: "2026-10-08T12:15:00Z",
    aiReasoning: "Continuous surface water accumulation detected adjacent to municipal valve housing.",
    recommendedNextAction: "Isolate main valve line #4 and dispatch repair crew.",
    history: [
      { status: "Submitted", timestamp: "2026-10-08T11:30:00Z", actor: "Citizen (App)", notes: "Report logged." },
      { status: "AI Triaged", timestamp: "2026-10-08T11:30:05Z", actor: "UrbanShield Vision Engine v1.2", notes: "Water Leakage (88% confidence)." },
      { status: "Verified", timestamp: "2026-10-08T12:00:00Z", actor: "Inspector #108", notes: "Verified major pipe leak." },
      { status: "Assigned", timestamp: "2026-10-08T12:15:00Z", actor: "Inspector #108", notes: "Assigned to Jal Board Team 1." }
    ]
  },
  {
    id: "US-1050",
    category: "Broken Streetlight",
    title: "Dark Corridor & Damaged Light Pole",
    description: "Streetlight fixture hanging precariously; bulb dark for 3 consecutive nights along pedestrian walkway.",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop",
    latitude: 28.5456,
    longitude: 77.1928,
    zone: "Zone 03 — Campus / West",
    address: "IIT Flyover Service Lane, Hauz Khas",
    predictedCategory: "Broken Streetlight",
    confidence: 0.95,
    severity: "Medium",
    priorityScore: 68,
    status: "In Progress",
    isVerifiedByHuman: true,
    verifiedBy: "Operator #210 (Electrical)",
    verifiedAt: "2026-10-07T18:00:00Z",
    assignedTo: "Electrical Maintenance Unit 4",
    assignedAt: "2026-10-08T09:00:00Z",
    createdAt: "2026-10-07T17:40:00Z",
    updatedAt: "2026-10-08T09:00:00Z",
    aiReasoning: "Pole tilt detected + dark optical sensor output in night imagery.",
    recommendedNextAction: "Replace LED fixture and inspect wiring harness.",
    history: [
      { status: "Submitted", timestamp: "2026-10-07T17:40:00Z", actor: "Student (App)", notes: "Logged issue." },
      { status: "AI Triaged", timestamp: "2026-10-07T17:40:06Z", actor: "UrbanShield Vision Engine v1.2", notes: "Broken Streetlight (95%)." },
      { status: "Verified", timestamp: "2026-10-07T18:00:00Z", actor: "Operator #210", notes: "Confirmed hardware damage." },
      { status: "In Progress", timestamp: "2026-10-08T09:00:00Z", actor: "Electrical Unit 4", notes: "Crew dispatched to site." }
    ]
  },
  {
    id: "US-1051",
    category: "Fallen Tree / Obstruction",
    title: "Large Tree Branch Blocking Lane",
    description: "Storm damage caused heavy branch to fall across secondary access road, blocking emergency vehicles.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    latitude: 28.5800,
    longitude: 77.2300,
    zone: "Zone 04 — South Residential",
    address: "Defence Colony Main Ave, New Delhi",
    predictedCategory: "Fallen Tree / Obstruction",
    confidence: 0.92,
    severity: "High",
    priorityScore: 79,
    status: "Resolved",
    isVerifiedByHuman: true,
    verifiedBy: "Inspector #305 (Horticulture)",
    verifiedAt: "2026-10-06T10:00:00Z",
    assignedTo: "Horticulture Quick Clearance",
    assignedAt: "2026-10-06T10:30:00Z",
    createdAt: "2026-10-06T08:15:00Z",
    updatedAt: "2026-10-06T13:45:00Z",
    aiReasoning: "Dense foliage object obstructing vehicular transit corridor.",
    recommendedNextAction: "Clear timber and restore lane clearance.",
    history: [
      { status: "Submitted", timestamp: "2026-10-06T08:15:00Z", actor: "Resident (App)", notes: "Logged obstacle." },
      { status: "AI Triaged", timestamp: "2026-10-06T08:15:05Z", actor: "UrbanShield Vision Engine v1.2", notes: "Fallen Tree (92%)." },
      { status: "Verified", timestamp: "2026-10-06T10:00:00Z", actor: "Inspector #305", notes: "Verified obstruction." },
      { status: "Resolved", timestamp: "2026-10-06T13:45:00Z", actor: "Horticulture Team", notes: "Timber removed, road fully cleared." }
    ]
  }
];

export const MOCK_HOTSPOTS = [
  { id: "HS-01", zone: "Zone 02 — Central District", riskScore: 89, primaryIssue: "Road Damage", recentCount: 24, trend: "+18%", riskLevel: "Critical" },
  { id: "HS-02", zone: "Zone 01 — North Market", riskScore: 82, primaryIssue: "Waste Overflow", recentCount: 31, trend: "+12%", riskLevel: "High" },
  { id: "HS-03", zone: "Zone 04 — South Residential", riskScore: 74, primaryIssue: "Water Leakage", recentCount: 15, trend: "-5%", riskLevel: "Medium" },
  { id: "HS-04", zone: "Zone 03 — Campus / West", riskScore: 61, primaryIssue: "Broken Streetlight", recentCount: 12, trend: "+3%", riskLevel: "Low" }
];

export const MOCK_MODEL_TELEMETRY = {
  modelVersion: "UrbanShield-CV-v1.2-ResNet50",
  datasetVersion: "Civic-Bench-v2.1 (Ethics Checked)",
  lastEvaluationDate: "Pending Field Pilot Evaluation",
  evaluationStatus: "Awaiting Measured Validation Data",
  inferenceLatencyMs: 240,
  confidenceThreshold: 0.70,
  humanVerificationRate: "100% (Strict Human-in-the-Loop Enforced)",
  classDistribution: [
    { name: "Waste Overflow", count: 420 },
    { name: "Road Damage", count: 380 },
    { name: "Water Leakage", count: 210 },
    { name: "Broken Streetlight", count: 195 },
    { name: "Fallen Tree / Obstruction", count: 140 }
  ]
};
