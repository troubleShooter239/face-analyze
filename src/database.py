from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from src.utils.config import db_settings

engine = create_async_engine(db_settings.dsn.unicode_string())
async_maker = async_sessionmaker(engine, autocommit=False, autoflush=False)


class Base(DeclarativeBase):
    pass


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with async_maker() as session:
        yield session
