export interface ProjectItem {
  id: string;
  name: string;
  state: string;
  district: string;
  project_type: string;
  land_area_hectares: number;
  affected_families: number;
  compensation_percentage: number;
  compensation_budget_cr: number;
  compensation_disbursed_cr: number;
  approval_delay_days: number;
  legal_disputes_count: number;
  documentation_complete: boolean;
  notification_complete: boolean;
  possession_percentage: number;
  rehabilitation_percentage: number;
  stakeholder_responsiveness: "High" | "Medium" | "Low";
  current_stage: string;
  risk_score: number;
  delay_probability: number;
  risk_category: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  predicted_delay_days: number;
  confidence_score: number;
  last_updated: string;
  latitude: number;
  longitude: number;
  bottleneck: string;
}

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: "LA-JH-2026-0042",
    name: "Ranchi Infrastructure Project",
    state: "Jharkhand",
    district: "Ranchi",
    project_type: "Highways & Expressways",
    land_area_hectares: 450.0,
    affected_families: 620,
    compensation_percentage: 29.0,
    compensation_budget_cr: 380.0,
    compensation_disbursed_cr: 110.2,
    approval_delay_days: 68,
    legal_disputes_count: 4,
    documentation_complete: false,
    notification_complete: true,
    possession_percentage: 22.0,
    rehabilitation_percentage: 18.0,
    stakeholder_responsiveness: "Low",
    current_stage: "Compensation",
    risk_score: 8.4,
    delay_probability: 0.84,
    risk_category: "HIGH",
    predicted_delay_days: 68,
    confidence_score: 0.89,
    last_updated: "Today",
    latitude: 23.3441,
    longitude: 85.3096,
    bottleneck: "Pending compensation disbursement and 4 title disputes in Ranchi District Court"
  },
  {
    id: "LA-OD-2026-0032",
    name: "Odisha Coastal Highway Project",
    state: "Odisha",
    district: "Bhubaneswar",
    project_type: "Highways & Expressways",
    land_area_hectares: 680.0,
    affected_families: 910,
    compensation_percentage: 18.0,
    compensation_budget_cr: 540.0,
    compensation_disbursed_cr: 97.2,
    approval_delay_days: 92,
    legal_disputes_count: 6,
    documentation_complete: false,
    notification_complete: true,
    possession_percentage: 12.0,
    rehabilitation_percentage: 8.0,
    stakeholder_responsiveness: "Low",
    current_stage: "Legal Review",
    risk_score: 9.1,
    delay_probability: 0.91,
    risk_category: "CRITICAL",
    predicted_delay_days: 105,
    confidence_score: 0.93,
    last_updated: "Yesterday",
    latitude: 20.2961,
    longitude: 85.8245,
    bottleneck: "CRZ clearance pending and multiple title injunctions in High Court"
  },
  {
    id: "LA-BR-2026-0017",
    name: "Patna Connectivity Project",
    state: "Bihar",
    district: "Patna",
    project_type: "Railways & Freight",
    land_area_hectares: 320.0,
    affected_families: 480,
    compensation_percentage: 42.0,
    compensation_budget_cr: 290.0,
    compensation_disbursed_cr: 121.8,
    approval_delay_days: 45,
    legal_disputes_count: 3,
    documentation_complete: true,
    notification_complete: true,
    possession_percentage: 35.0,
    rehabilitation_percentage: 28.0,
    stakeholder_responsiveness: "Medium",
    current_stage: "Compensation",
    risk_score: 7.2,
    delay_probability: 0.72,
    risk_category: "HIGH",
    predicted_delay_days: 54,
    confidence_score: 0.86,
    last_updated: "2 days ago",
    latitude: 25.5941,
    longitude: 85.1376,
    bottleneck: "Grievances regarding multi-crop agricultural land valuation"
  },
  {
    id: "LA-MH-2026-0105",
    name: "Pune Multimodal Logistics Park",
    state: "Maharashtra",
    district: "Pune",
    project_type: "Industrial Corridors",
    land_area_hectares: 510.0,
    affected_families: 340,
    compensation_percentage: 68.0,
    compensation_budget_cr: 420.0,
    compensation_disbursed_cr: 285.6,
    approval_delay_days: 22,
    legal_disputes_count: 1,
    documentation_complete: true,
    notification_complete: true,
    possession_percentage: 58.0,
    rehabilitation_percentage: 62.0,
    stakeholder_responsiveness: "High",
    current_stage: "Rehabilitation & Resettlement",
    risk_score: 4.6,
    delay_probability: 0.46,
    risk_category: "MEDIUM",
    predicted_delay_days: 28,
    confidence_score: 0.88,
    last_updated: "3 days ago",
    latitude: 18.5204,
    longitude: 73.8567,
    bottleneck: "Pending handover of electrical transmission corridor"
  },
  {
    id: "LA-UP-2026-0211",
    name: "Varanasi Ring Road Extension",
    state: "Uttar Pradesh",
    district: "Varanasi",
    project_type: "Highways & Expressways",
    land_area_hectares: 290.0,
    affected_families: 410,
    compensation_percentage: 82.0,
    compensation_budget_cr: 260.0,
    compensation_disbursed_cr: 213.2,
    approval_delay_days: 12,
    legal_disputes_count: 0,
    documentation_complete: true,
    notification_complete: true,
    possession_percentage: 75.0,
    rehabilitation_percentage: 80.0,
    stakeholder_responsiveness: "High",
    current_stage: "Possession",
    risk_score: 2.8,
    delay_probability: 0.28,
    risk_category: "LOW",
    predicted_delay_days: 14,
    confidence_score: 0.92,
    last_updated: "Today",
    latitude: 25.3176,
    longitude: 82.9739,
    bottleneck: "None. Direct bank disbursements progressing smoothly"
  },
  {
    id: "LA-GJ-2026-0088",
    name: "Ahmedabad Solar Energy Complex",
    state: "Gujarat",
    district: "Ahmedabad",
    project_type: "Renewable Energy",
    land_area_hectares: 750.0,
    affected_families: 180,
    compensation_percentage: 94.0,
    compensation_budget_cr: 310.0,
    compensation_disbursed_cr: 291.4,
    approval_delay_days: 5,
    legal_disputes_count: 0,
    documentation_complete: true,
    notification_complete: true,
    possession_percentage: 92.0,
    rehabilitation_percentage: 90.0,
    stakeholder_responsiveness: "High",
    current_stage: "Acquisition",
    risk_score: 1.6,
    delay_probability: 0.16,
    risk_category: "LOW",
    predicted_delay_days: 6,
    confidence_score: 0.95,
    last_updated: "Today",
    latitude: 23.0225,
    longitude: 72.5714,
    bottleneck: "Final mutation certificates being issued"
  }
];

export interface AlertItem {
  id: number;
  project_id: string;
  project_name: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  message: string;
  primary_factor: string;
  recommended_action: string;
  time: string;
  is_read: boolean;
  is_acknowledged: boolean;
}

export const DEMO_ALERTS: AlertItem[] = [
  {
    id: 1,
    project_id: "LA-JH-2026-0042",
    project_name: "Ranchi Infrastructure Project",
    title: "Delay probability increased",
    severity: "HIGH",
    message: "Delay probability increased from 61% to 84%.",
    primary_factor: "Compensation Delay",
    recommended_action: "Immediate compensation review and Special LAO verification.",
    time: "10 mins ago",
    is_read: false,
    is_acknowledged: false
  },
  {
    id: 2,
    project_id: "LA-OD-2026-0032",
    project_name: "Odisha Coastal Highway Project",
    title: "Compensation delay detected",
    severity: "CRITICAL",
    message: "Compensation disbursement overdue by 45 days. High PAF discontent reported.",
    primary_factor: "Compensation Disbursement",
    recommended_action: "Publish pending award list and verify joint beneficiary bank accounts.",
    time: "45 mins ago",
    is_read: false,
    is_acknowledged: false
  },
  {
    id: 3,
    project_id: "LA-BR-2026-0017",
    project_name: "Patna Connectivity Project",
    title: "Legal dispute unresolved",
    severity: "HIGH",
    message: "3 valuation petitions awaiting counter-affidavit in District Court.",
    primary_factor: "Legal Dispute",
    recommended_action: "Submit Section 64 reference to State Authority for fast-tracking.",
    time: "2 hours ago",
    is_read: true,
    is_acknowledged: false
  },
  {
    id: 4,
    project_id: "LA-MH-2026-0105",
    project_name: "Pune Multimodal Logistics Park",
    title: "Approval timeline exceeded",
    severity: "MEDIUM",
    message: "Inter-agency transmission utility NoC pending past 20 days.",
    primary_factor: "Approval Delay",
    recommended_action: "Convene bilateral coordination session with state electricity board.",
    time: "5 hours ago",
    is_read: true,
    is_acknowledged: true
  }
];
