from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .startup import drop_and_create, insert_test_data
from .admin import create_admin_panel
from .database import engine
from .routers import admins, auth, users, ai, logs, images, ai_result
from .utils.config import app_settings, cors_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await drop_and_create()
    await insert_test_data()
    yield
    await engine.dispose()


app = FastAPI(
    **app_settings.model_dump(), 
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, **cors_settings.model_dump())

for r in admins.router, auth.router, users.router, ai.router, logs.router, images.router, ai_result.router:
    app.include_router(r)

create_admin_panel(app)