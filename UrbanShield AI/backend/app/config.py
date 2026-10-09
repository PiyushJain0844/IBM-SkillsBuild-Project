import os

class Settings:
    PROJECT_NAME: str = "UrbanShield AI — Backend Service"
    VERSION: str = "0.3.0"
    API_PREFIX: str = "/api"
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
