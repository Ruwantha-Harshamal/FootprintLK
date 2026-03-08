from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, social_media, risk_scoring

app = FastAPI(title="FootprintLK API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://frontend-xi-dusky-39.vercel.app",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(social_media.router, prefix="/api/social-media", tags=["Social Media Analysis"])
app.include_router(risk_scoring.router, prefix="/api/risk-scoring", tags=["Risk Scoring"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "FootprintLK API is running"}
