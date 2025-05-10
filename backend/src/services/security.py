from datetime import timedelta, datetime, timezone

from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext
from pydantic import ValidationError

from src.utils.exceptions import ValidateCredentialsError
from ..models.extra import UserRole
from ..schemas.auth import Payload
from ..utils.config import SecuritySettings
from ..utils.logger import logger

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(user_id: int | str, email: str, role: str, security: SecuritySettings) -> str:
    """Generate an access token for the specified user.

    Args:
        user_id (int | str): User ID.
        email (str): User's email address.
        role (str): User role.
        security (SecuritySettings): Security settings for encoding.

    Returns:
        str: Encoded JWT access token for the user."""
    return encode({
        "sub": str(user_id),
        "email": email,
        "admin": role != UserRole.USER.value,
        "exp": (datetime.now(timezone.utc) + timedelta(hours=security.expire_hours)).timestamp()
    }, security.secret_key.get_secret_value(), security.algorithm.get_secret_value())


def get_current_user(token: str, security: SecuritySettings) -> Payload:
    """Retrieve the current user based on the provided JWT token.

    Args:
        token (str): JWT token passed from the authorization header.
        security (SecuritySettings): Secret key and algorithm for decode.

    Returns:
        payload: The decoded JWT token.

    Raises:
        ValidateCredentialsException: If token is invalid.
        UserNotFound: If user does not exist in the database."""
    try:
        return Payload(**decode(token, security.secret_key.get_secret_value(), [security.algorithm.get_secret_value()]))
    except (InvalidTokenError, ValidationError) as e:
        logger.info(f'Validate jwt error: {e}')
        raise ValidateCredentialsError()
