from typing import List, Dict, Any

def generate_recommendations(project_dict: Dict[str, Any], risk_category: str = "HIGH") -> List[Dict[str, Any]]:
    """
    Generates structured, actionable recommendations mapped directly to detected bottlenecks
    under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation
    and Resettlement (RFCTLARR) Act, 2013 and DoLR guidelines.
    """
    recommendations = []

    comp_pct = float(project_dict.get("compensation_percentage", 100))
    disputes = int(project_dict.get("legal_disputes_count", 0))
    approval_days = int(project_dict.get("approval_delay_days", 0))
    doc_complete = bool(project_dict.get("documentation_complete", False))
    stakeholder = str(project_dict.get("stakeholder_responsiveness", "Medium")).capitalize()
    rehab_pct = float(project_dict.get("rehabilitation_percentage", 100))
    current_stage = str(project_dict.get("current_stage", ""))
    possession_pct = float(project_dict.get("possession_percentage", 0))

    # 1. Compensation Recommendations
    if comp_pct < 40:
        recommendations.append({
            "problem": f"Severely Lagging Compensation Disbursement ({comp_pct:.1f}%)",
            "severity": "CRITICAL",
            "recommended_action": "Convene Special Land Acquisition Officer (LAO) Lok Adalat for expedited direct bank transfer (DBT) verification and grievance disposal.",
            "responsible_department": "Revenue & Land Reforms Department / District Collectorate",
            "priority": "P1",
            "expected_impact": "Reduces projected acquisition delay by 35 to 45 days and prevents landowner injunctions."
        })
    elif comp_pct < 75:
        recommendations.append({
            "problem": f"Compensation Disbursement Gap ({comp_pct:.1f}% disbursed)",
            "severity": "HIGH",
            "recommended_action": "Publish pending award list in local Panchayat offices and verify joint beneficiary bank accounts to release award tranches.",
            "responsible_department": "District Land Acquisition Officer (CALA)",
            "priority": "P2",
            "expected_impact": "Accelerates financial settlement by 20 to 25 days."
        })

    # 2. Legal Dispute Recommendations
    if disputes >= 3:
        recommendations.append({
            "problem": f"High Litigation Volume ({disputes} Active Petitions / Court Cases)",
            "severity": "CRITICAL",
            "recommended_action": "Submit urgent hearing applications and refer valuation grievances to the State Land Acquisition, Rehabilitation & Resettlement Authority (Sec 64).",
            "responsible_department": "State Legal Cell & Government Pleader",
            "priority": "P1",
            "expected_impact": "Mitigates legal stay risks and saves up to 60 days of court litigation latency."
        })
    elif disputes in (1, 2):
        recommendations.append({
            "problem": f"{disputes} Pending Court Grievance(s)",
            "severity": "HIGH",
            "recommended_action": "Engage standing government counsel to file counter-affidavits and propose deposit of compensation in escrow to lift interim stays.",
            "responsible_department": "District Legal Officer",
            "priority": "P2",
            "expected_impact": "Facilitates early disposal of status-quo orders within 15-30 days."
        })

    # 3. Approvals Backlog
    if approval_days > 45:
        recommendations.append({
            "problem": f"Statutory Clearances Overdue by {approval_days} Days",
            "severity": "HIGH",
            "recommended_action": "Escalate inter-departmental pending NoCs to State Level Single Window / PMG Portal for Chief Secretary review.",
            "responsible_department": "Project Monitoring Group (PMG) & Line Ministry",
            "priority": "P1",
            "expected_impact": "Bypasses inter-agency friction and recovers 20-30 days in timeline."
        })
    elif approval_days > 15:
        recommendations.append({
            "problem": f"Pending Inter-Departmental Clearances ({approval_days} days)",
            "severity": "MEDIUM",
            "recommended_action": "Schedule bilateral coordination session with Forest, Railway, or Defense authorities for expedited Joint Site Inspection.",
            "responsible_department": "Executing Agency / Nodal Officer",
            "priority": "P2",
            "expected_impact": "Expedites pending NoCs within 10-14 days."
        })

    # 4. Documentation
    if not doc_complete:
        recommendations.append({
            "problem": "Incomplete Land Cadastre & Title Records",
            "severity": "HIGH",
            "recommended_action": "Deploy specialized revenue patwari task-force using DILRMP (Digital India Land Records) digitized maps to cross-verify RoR.",
            "responsible_department": "District Settlement & Revenue Department",
            "priority": "P2",
            "expected_impact": "Eliminates documentation deficiencies and title ambiguities in 14 days."
        })

    # 5. Stakeholder Responsiveness
    if stakeholder == "Low":
        recommendations.append({
            "problem": "Low Stakeholder Responsiveness & Community Resistance",
            "severity": "HIGH",
            "recommended_action": "Convene Special Gram Sabha consultations with PRI leaders and civil society mediators; transparently present the R&R benefit matrix.",
            "responsible_department": "Sub-Divisional Magistrate (SDM) & Social Impact Assessment (SIA) Unit",
            "priority": "P1",
            "expected_impact": "Restores community trust, preventing local blockades and saving 25-40 days."
        })

    # 6. R&R Progress
    if rehab_pct < 50 and current_stage in ["Rehabilitation & Resettlement", "Possession", "Compensation Disbursement"]:
        recommendations.append({
            "problem": f"Lagging Rehabilitation & Resettlement Infrastructure ({rehab_pct:.1f}%)",
            "severity": "HIGH",
            "recommended_action": "Fast-track basic civic amenities (water, roads, school) at R&R resettlement colony and disburse one-time transitional allowances.",
            "responsible_department": "R&R Commissioner / District Administration",
            "priority": "P2",
            "expected_impact": "Unlocks voluntary physical relocation, advancing possession by 30 days."
        })

    # 7. Possession Bottleneck
    if possession_pct < 40 and current_stage in ["Possession", "Final Acquisition"]:
        recommendations.append({
            "problem": f"Physical Land Possession Lagging ({possession_pct:.1f}%)",
            "severity": "CRITICAL",
            "recommended_action": "Coordinate joint demarcation survey with district police bandobast and issue Sec 38 possession certificates in peaceful clusters.",
            "responsible_department": "District Magistrate & Superintendent of Police",
            "priority": "P1",
            "expected_impact": "Enables phased handover to contractor, mitigating civil work standby penalties."
        })

    # Fallback if everything is on track
    if not recommendations:
        recommendations.append({
            "problem": "No Critical Bottlenecks Detected",
            "severity": "LOW",
            "recommended_action": "Maintain scheduled milestone tracking and ensure timely upload of monthly physical-financial progress reports.",
            "responsible_department": "Project Monitoring Unit",
            "priority": "P3",
            "expected_impact": "Maintains current project velocity on target."
        })

    return recommendations
