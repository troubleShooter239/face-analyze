from typing import Sequence

from sqlalchemy import ColumnExpressionArgument
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import Base


async def update(db: AsyncSession, instance: Base) -> None:
    await db.commit()
    await db.refresh(instance)


async def create(db: AsyncSession, instance: Base) -> None:
    db.add(instance)
    await update(db, instance)


async def read(db: AsyncSession, instance: type[Base], *where: ColumnExpressionArgument[bool]) -> Base | None:
    return (await db.execute(select(instance).where(*where))).scalar()


async def read_all(db: AsyncSession, instance: type[Base], skip: int, limit: int) -> Sequence[Base] | None:
    return (await db.execute(select(instance).offset(skip).limit(limit))).scalars().all()


async def delete(db: AsyncSession, instance: type[Base], *where: ColumnExpressionArgument[bool]) -> None:
    row = (await db.execute(select(instance).where(*where))).scalar()
    if not row:
        raise NoResultFound()
    await db.delete(row)
    await db.commit()
