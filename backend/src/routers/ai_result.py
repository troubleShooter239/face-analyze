from src.dependencies import is_admin_d
from src.models import AIResult
from src.routers import create_router

router = create_router('/ai_results', [is_admin_d], 'id', AIResult, AIResult.id, int)
