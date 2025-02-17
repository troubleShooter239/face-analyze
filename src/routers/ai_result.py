from fastapi import APIRouter
from sqlalchemy import select

from src.dependencies import db_d, is_admin_d
from src.models import Admin, AIResult
from src.utils.exceptions import UserNotFound

router = APIRouter(prefix='/ai_results', tags=['ai_results'], dependencies=[is_admin_d])


@router.get("/{id}")
async def get_ai_result(id: int, db: db_d):
    return (await db.execute(select(Admin).where(AIResult.id == id))).scalar()


@router.get('')
async def get_ai_results(db: db_d, skip: int = 0, limit: int = 10):
    return (await db.execute(select(AIResult).offset(skip).limit(limit))).scalars().all()


@router.delete('/{id}')
async def delete_ai_result(id: int, db: db_d) -> None:
    admin = (await db.execute(select(AIResult).where(AIResult.id == id))).scalar()
    if not admin:
        raise UserNotFound()
    await db.delete(admin)
    await db.commit()
