from typing import Sequence, Any

from fastapi import APIRouter, Depends
from sqlalchemy.exc import NoResultFound
from starlette import status

from src.database import Base
from src.dependencies import db_d
from src.services.crud import read, read_all, delete
from src.utils.exceptions import EntityNotFound


def create_router(
        prefix: str, dependencies: Sequence[Depends], path: str, model: type[Base], model_attr: Any,
        param_type: type[Any]
) -> APIRouter:
    """Fabric method for router creation"""
    router = APIRouter(prefix=prefix, tags=[prefix.strip('/')], dependencies=dependencies)

    @router.get(f"/{path}")
    async def get_entity(parameter: param_type, db: db_d):
        return await read(db, model, model_attr == parameter)

    @router.get('')
    async def get_entities(db: db_d, skip: int = 0, limit: int = 10):
        return await read_all(db, model, skip, limit)

    @router.delete(f'/{path}', status_code=status.HTTP_204_NO_CONTENT)
    async def delete_entity(parameter: param_type, db: db_d) -> None:
        try:
            await delete(db, model, model_attr == parameter)
        except NoResultFound:
            raise EntityNotFound()

    return router
