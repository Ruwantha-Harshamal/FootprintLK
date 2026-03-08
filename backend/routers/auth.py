from fastapi import APIRouter
from pydantic import BaseModel
import uuid

router = APIRouter()

class AuthResponse(BaseModel):
    token: str
    user: dict

class LoginData(BaseModel):
    email: str
    password: str

class RegisterData(BaseModel):
    name: str
    email: str
    password: str

@router.post("/login", response_model=AuthResponse)
async def login(data: LoginData):
    return {
        "token": "mock-jwt-token-123",
        "user": {
            "id": "u1",
            "name": data.email.split('@')[0],
            "email": data.email,
            "role": "user"
        }
    }

@router.post("/register", response_model=AuthResponse)
async def register(data: RegisterData):
    return {
        "token": "mock-jwt-token-456",
        "user": {
            "id": str(uuid.uuid4()),
            "name": data.name,
            "email": data.email,
            "role": "user"
        }
    }

@router.get("/me")
async def get_me():
    return {
        "id": "u1",
        "name": "Demo User",
        "email": "demo@example.com",
        "role": "user"
    }

@router.post("/logout")
async def logout():
    return {"success": True}
