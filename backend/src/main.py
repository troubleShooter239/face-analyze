from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.admin import create_admin_panel
from src.routers import admins, auth, users, ai, logs, images, ai_result
from src.utils.config import app_settings, cors_settings

app = FastAPI(**app_settings.model_dump())
app.add_middleware(CORSMiddleware, **cors_settings.model_dump())

create_admin_panel(app)

for r in admins.router, auth.router, users.router, ai.router, logs.router, images.router, ai_result.router:
    app.include_router(r)
