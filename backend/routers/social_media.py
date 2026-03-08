from fastapi import APIRouter
from pydantic import BaseModel
import asyncio
import uuid

router = APIRouter()

class ScanRequest(BaseModel):
    targetName: str

# In-memory store for scans
scans_db = {}

# Mock data generator for OSINT results
def generate_mock_profiles(targetName: str):
    base_name = targetName.lower().replace(" ", "")
    return [
        {
            "id": str(uuid.uuid4()),
            "platform": "Facebook",
            "username": f"{base_name}.real",
            "fullName": targetName,
            "profileUrl": f"https://facebook.com/{base_name}.real",
            "avatarUrl": f"https://i.pravatar.cc/150?u={base_name}.real",
            "matchScore": 98,
            "isImpersonationRisk": False,
            "status": "pending",
            "extractedData": [
                {"id": str(uuid.uuid4()), "type": "Email", "value": f"{base_name}@example.com", "source": "Facebook", "riskLevel": "high"},
                {"id": str(uuid.uuid4()), "type": "Birthday", "value": "15-Aug-1990", "source": "Facebook", "riskLevel": "high"}
            ]
        },
        {
            "id": str(uuid.uuid4()),
            "platform": "LinkedIn",
            "username": f"{base_name}-professional",
            "fullName": f"{targetName} (Software Eng)",
            "profileUrl": f"https://linkedin.com/in/{base_name}-professional",
            "avatarUrl": f"https://i.pravatar.cc/150?u={base_name}-professional",
            "matchScore": 95,
            "isImpersonationRisk": False,
            "status": "pending",
            "extractedData": [
                 {"id": str(uuid.uuid4()), "type": "Phone", "value": "+94 77 123 4567", "source": "LinkedIn", "riskLevel": "critical"},
                 {"id": str(uuid.uuid4()), "type": "Education", "value": "University of Colombo", "source": "LinkedIn", "riskLevel": "low"}
            ]
        },
        {
            "id": str(uuid.uuid4()),
            "platform": "Instagram",
            "username": f"{base_name}.official.fake",
            "fullName": f"{targetName} Official",
            "profileUrl": f"https://instagram.com/{base_name}.official.fake",
            "avatarUrl": "https://i.pravatar.cc/150?u=fake",
            "matchScore": 88,
            "isImpersonationRisk": True,
            "status": "pending",
            "extractedData": [
                {"id": str(uuid.uuid4()), "type": "Location", "value": "Kandy, Sri Lanka", "source": "Instagram", "riskLevel": "medium"}
            ]
        }
    ]

# Background task to simulate scanning process
async def process_scan(scan_id: str, targetName: str):
    await asyncio.sleep(2)  # Simulate network latency/processing
    profiles = generate_mock_profiles(targetName)
    
    # Calculate summaries
    critical = sum(1 for p in profiles for d in p['extractedData'] if d['riskLevel'] == 'critical')
    high = sum(1 for p in profiles for d in p['extractedData'] if d['riskLevel'] == 'high')
    impersonation = sum(1 for p in profiles if p['isImpersonationRisk'])

    scans_db[scan_id] = {
        "scanId": scan_id,
        "targetName": targetName,
        "status": "completed",
        "progress": 100,
        "profilesFound": profiles,
        "summary": {
            "totalProfiles": len(profiles),
            "criticalRiskItems": critical,
            "highRiskItems": high,
            "impersonationThreats": impersonation
        },
        "recommendations": [
            {"id": "r1", "text": "Remove your phone number from public view on LinkedIn.", "severity": "critical"},
            {"id": "r2", "text": f"Report the Instagram profile '{profiles[2]['username']}' for impersonation.", "severity": "high"}
        ]
    }

@router.post("/scan")
async def start_scan(req: ScanRequest):
    scan_id = str(uuid.uuid4())
    scans_db[scan_id] = {
        "scanId": scan_id,
        "targetName": req.targetName,
        "status": "scanning",
        "progress": 0,
        "profilesFound": [],
        "summary": {"totalProfiles": 0, "criticalRiskItems": 0, "highRiskItems": 0, "impersonationThreats": 0},
        "recommendations": []
    }
    
    # Start background task
    asyncio.create_task(process_scan(scan_id, req.targetName))
    
    return scans_db[scan_id]

@router.get("/scan/{scan_id}")
async def get_scan_progress(scan_id: str):
    if scan_id not in scans_db:
         return {"error": "Scan not found"}
    
    scan = scans_db[scan_id]
    
    # Simulate progress increments if still scanning
    if scan["status"] == "scanning":
        scan["progress"] = min(scan["progress"] + 30, 95)
        
    return scan
