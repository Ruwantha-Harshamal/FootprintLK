from fastapi import APIRouter
from pydantic import BaseModel
import asyncio
import uuid

router = APIRouter()

class AssessmentRequest(BaseModel):
    dataInput: str
    flags: dict
    platform: str

# In-memory store for tasks
assessments_db = {}

def evaluate_privacy_scenario(req: AssessmentRequest):
    data_lower = req.dataInput.lower()
    flags = req.flags
    platform = req.platform
    
    matched_clauses = []
    recommendations = []
    scenario = "General Data Exposure"
    risk_level = "low"
    overall_score = 15

    # Simple Keyword / Rules Engine (Simulating AI NLP similarity matching)
    if "passport" in data_lower or "id" in data_lower or "nic" in data_lower:
        risk_level = "critical"
        overall_score += 40
        matched_clauses.append({
            "id": "l1",
            "code": "PDPA Act No. 9 of 2022",
            "section": "Section 5 (Principles)",
            "description": "Lawfulness, fairness, and transparency in processing personal data.",
            "fullText": "Personal data shall be processed lawfully, fairly, and in a transparent manner...",
            "explanation": "Exposure of national UI/Passports violates core data processing principles if done without consent.",
            "penalty": "Fines up to LKR 10 Million.",
            "matchedTags": ["national id", "unauthorized disclosure"],
            "relevanceScore": 95,
            "reasons": ["Detected highly sensitive government ID tokens in input."],
            "confidenceLevel": "high"
        })
        recommendations.append({"id": "r1", "text": "Report potential identity theft to local authorities immediately.", "severity": "critical", "category": "Legal Action"})
    
    if flags.get("impersonation", False):
        scenario = "Identity Theft & Impersonation"
        risk_level = "critical" if risk_level != "critical" else "critical"
        overall_score += 35
        matched_clauses.append({
            "id": "l2",
            "code": "Penal Code of Sri Lanka",
            "section": "Section 399 & 403",
            "description": "Cheating by personation.",
            "fullText": "A person is said to cheat by personation if he cheats by pretending to be some other person...",
            "explanation": "A fake profile using your identity falls under cheating by personation.",
            "penalty": "Imprisonment extending to 3 years, or fine, or both.",
            "matchedTags": ["impersonation", "cheating"],
            "relevanceScore": 98,
            "reasons": ["Explicit impersonation flag provided in context."],
            "confidenceLevel": "high"
        })
        recommendations.append({"id": "r2", "text": f"Submit an impersonation report to {platform.title()} support.", "severity": "high", "category": "Mitigation"})

    if flags.get("passwordLeak", False):
        if scenario == "General Data Exposure":
            scenario = "Account Compromise"
        risk_level = "high" if risk_level in ["low", "medium"] else risk_level
        overall_score += 30
        recommendations.append({"id": "r3", "text": "Change passwords immediately and enable 2FA on all linked accounts.", "severity": "critical", "category": "Security"})
        
    if platform == "darkweb":
         scenario = "Dark Web Data Breach"
         risk_level = "critical"
         overall_score = 95
         recommendations.append({"id": "r4", "text": "Monitor credit reports and bank statements for fraudulent activity.", "severity": "critical", "category": "Monitoring"})

    # Cap score
    overall_score = min(overall_score, 100)
    
    # Default fallbacks if no severe rules match
    if not matched_clauses:
         overall_score = max(overall_score, 25)
         risk_level = "medium"
         matched_clauses.append({
            "id": "ld",
            "code": "General Privacy Guidelines",
            "section": "N/A",
            "description": "Public data exposure without explicit harm.",
            "fullText": "Information publicly visible without immediate criminal intent.",
            "explanation": "Your data is visible but not currently associated with a specific crime.",
            "penalty": "N/A",
            "matchedTags": ["public data"],
            "relevanceScore": 50,
            "reasons": ["No explicit malicious scenario matched."],
            "confidenceLevel": "medium"
        })
         recommendations.append({"id": "rd", "text": "Review your privacy settings on social media platforms.", "severity": "medium", "category": "Security"})

    return {
        "status": "completed",
        "inferredScenario": scenario,
        "overallScore": overall_score,
        "riskLevel": risk_level,
        "matchedClauses": matched_clauses,
        "recommendations": recommendations,
    }

async def process_assessment(scan_id: str, req: AssessmentRequest):
    await asyncio.sleep(2) # simulate AI processing
    result = evaluate_privacy_scenario(req)
    assessments_db[scan_id].update(result)

@router.post("/assess")
async def start_assessment(req: AssessmentRequest):
    scan_id = str(uuid.uuid4())
    assessments_db[scan_id] = {
        "scanId": scan_id,
        "status": "analyzing",
        "inferredScenario": "",
        "overallScore": 0,
        "riskLevel": "low",
        "matchedClauses": [],
        "recommendations": []
    }
    
    asyncio.create_task(process_assessment(scan_id, req))
    return assessments_db[scan_id]

@router.get("/assess/{scan_id}")
async def get_assessment(scan_id: str):
    if scan_id not in assessments_db:
        return {"error": "Assessment not found"}
    return assessments_db[scan_id]
