import os


class Settings:
    PROJECT_NAME = "UrbanShield AI Backend"
    VERSION = "0.3.0"
    API_PREFIX = "/api"

    default_origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    configured_origins = os.getenv("CORS_ORIGINS", "")

    if configured_origins.strip():
        CORS_ORIGINS = [
            origin.strip().rstrip("/")
            for origin in configured_origins.split(",")
            if origin.strip()
        ]
    else:
        CORS_ORIGINS = default_origins


settings = Settings()