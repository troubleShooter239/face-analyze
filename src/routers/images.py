from fastapi import APIRouter
from sqlalchemy import select
from starlette import status

from src.dependencies import db_d, is_admin_d
from src.models import Log, Image
from src.schemas.images import AddImg
from src.utils.exceptions import UserNotFound

router = APIRouter(prefix='/images', tags=['images'], dependencies=[is_admin_d])


@router.post('', status_code=status.HTTP_201_CREATED)
async def add_img(r: AddImg, db: db_d) -> None:
    new_log = Log(user_id=r.id, time=r.time, action=r.action)
    db.add(new_log)
    await db.commit()
    await db.refresh(new_log)


@router.get("/{id}")
async def get_img(id: int, db: db_d):
    return (await db.execute(select(Image).where(Image.id == id))).scalar()


@router.get('')
async def get_imgs(db: db_d, skip: int = 0, limit: int = 10):
    return (await db.execute(select(Image).offset(skip).limit(limit))).scalars().all()


@router.delete('/{id}')
async def delete_img(id: int, db: db_d) -> None:
    log = (await db.execute(select(Image).where(Image.id == id))).scalar()
    if not log:
        raise UserNotFound()
    await db.delete(log)
    await db.commit()
