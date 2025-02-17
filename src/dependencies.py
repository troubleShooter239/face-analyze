from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_async_session
from src.services.security import get_current_user
from src.utils.config import security_settings
from src.utils.exceptions import UnexpectedTokenType, UserIsNotAdmin

db_d = Annotated[AsyncSession, Depends(get_async_session)]


def verify_admin(token: str, token_type: str = 'bearer') -> None:
    if token_type != 'bearer':
        raise UnexpectedTokenType()
    if not get_current_user(token, security_settings).admin:
        raise UserIsNotAdmin()


is_admin_d = Depends(verify_admin)


def verify_user(token: str, token_type: str = 'bearer') -> None:
    if token_type != 'bearer':
        raise UnexpectedTokenType()
    if get_current_user(token, security_settings).admin:
        raise UserIsNotAdmin()


is_user_d = Depends(verify_user)
