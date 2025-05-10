from sqlalchemy import select
from starlette import status

from src.dependencies import db_d, is_admin_d
from src.models import Log, AdminLog
from src.routers import create_router
from src.schemas.logs import AddLogs
from src.utils.exceptions import UserNotFound

router = create_router('/logs', [is_admin_d], 'id', Log, Log.id, int)


@router.post('', status_code=status.HTTP_201_CREATED)
async def add_log(r: AddLogs, db: db_d) -> None:
    new_log = Log(user_id=r.id, time=r.time, action=r.action)
    db.add(new_log)
    await db.commit()
    await db.refresh(new_log)


@router.post('/admin', status_code=status.HTTP_201_CREATED)
async def add_log_admin(r: AddLogs, db: db_d) -> None:
    new_log = AdminLog(admin_id=r.id, time=r.time, action=r.action)
    db.add(new_log)
    await db.commit()
    await db.refresh(new_log)


@router.get("/admin/{id}")
async def get_log_admin(id: int, db: db_d):
    return (await db.execute(select(AdminLog).where(AdminLog.id == id))).scalar()


@router.get('/admin')
async def get_logs_admin(db: db_d, skip: int = 0, limit: int = 10):
    return (await db.execute(select(AdminLog).offset(skip).limit(limit))).scalars().all()


@router.delete('/admin/{id}')
async def delete_log_admin(id: int, db: db_d) -> None:
    admin = (await db.execute(select(AdminLog).where(AdminLog.id == id))).scalar()
    if not admin:
        raise UserNotFound()
    await db.delete(admin)
    await db.commit()
