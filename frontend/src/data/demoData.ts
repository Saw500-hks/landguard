import allProjectsJson from './allProjects.json';
import allAlertsJson from './allAlerts.json';
import allRecommendationsJson from './allRecommendations.json';

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

export const DEMO_PROJECTS: ProjectItem[] = allProjectsJson as ProjectItem[];

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

export const DEMO_ALERTS: AlertItem[] = allAlertsJson as AlertItem[];

export interface RecommendationItem {
  id: number;
  project_id: string;
  problem: string;
  recommended_action: string;
  responsible_department: string;
  priority_level: string;
  expected_impact_days: number;
  status: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

export const DEMO_RECOMMENDATIONS: RecommendationItem[] = allRecommendationsJson as unknown as RecommendationItem[];
