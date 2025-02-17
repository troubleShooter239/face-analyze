from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers import admins, auth, users, ai, logs, images, ai_result
from src.utils.config import app_settings, cors_settings

app = FastAPI(**app_settings.model_dump())
app.add_middleware(CORSMiddleware, **cors_settings.model_dump())
app.include_router(admins.router)
app.include_router(ai.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(logs.router)
app.include_router(images.router)
app.include_router(ai_result.router)
