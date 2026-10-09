from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import reports, dashboard

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="UrbanShield AI - Civic Intelligence Platform"
)

# Allow the Vercel frontend to communicate with Render.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes.
app.include_router(
    reports.router,
    prefix=settings.API_PREFIX
)

app.include_router(
    dashboard.router,
    prefix=settings.API_PREFIX
)


@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "documentation": "/docs"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    ) 