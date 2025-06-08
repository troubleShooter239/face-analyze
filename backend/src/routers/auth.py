from datetime import datetime, UTC

from fastapi import APIRouter
from sqlalchemy import select, union_all

from src.dependencies import db_d
from src.models import User, Admin
from src.schemas.auth import Token, Payload, SignInRequest, SignUpRequest
from src.services.security import create_access_token, get_current_user, pwd_context
from src.utils.config import security_settings
from src.utils.exceptions import UserNotFound, InvalidDataStored, EntityAlreadyExists, UnexpectedTokenType, \
    IncorrectPassword
from src.utils.logger import logger

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post("/sign_in", response_model=Token)
async def sign_in(r: SignInRequest, db: db_d) -> dict[str, str]:
    """Authenticate a user and return a JWT token.

    ### Request Body:
    - **email** (`str`): The user's email address.
    - **password** (`str`): The user's password.

    ### Response:
    - **token** (`str`): The generated JWT token.
    - **token_type** (`str`): The type of token. Always 'bearer'.

    ### Raises:
    - **IncorrectPassword**: If the provided password does not match the stored password.
    - **UserNotFound**: If no user with the provided email is found.
    - **InvalidDataStored**: If the stored user data is invalid.

    ### Example Request:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

    ### Example Response:
    ```json
    {
      "token": "your_jwt_token_here",
      "token_type": "bearer"
    }
    ```"""
    user = (await db.execute(select(User).where(User.email == r.email))).scalar_one_or_none()
    if not user:
      user = (await db.execute(select(Admin).where(Admin.email == r.email))).scalar_one_or_none()
    if not user:
        logger.info(f"User with email: {r.email} is not found")
        raise UserNotFound()

    logger.info(f"User found: {r.email}")
    if not pwd_context.verify(r.password.get_secret_value(), user.password):
        logger.info(f"Incorrect password for {r.email}")
        raise IncorrectPassword()

    logger.info(f"User {r.email} can be authorized successfully")
    try:
        return {
            "token": create_access_token(user.id, user.email, user.role, security_settings),
            "token_type": "bearer"
        }
    except KeyError:
        logger.error("Incorrect data in database")
        raise InvalidDataStored()


@router.post("/sign_up", response_model=Token)
async def sign_up(r: SignUpRequest, db: db_d) -> dict[str, str]:
    """Register a new user and return a JWT token.

    ### Request Body:
    - **email** (`str`): The user's email address. Must be unique.
    - **password** (`str`): The user's password. It will be securely hashed before storage.
    - **created_at** (`datetime`): The timestamp when the user was created.

    ### Response:
    - **access_token** (`str`): The generated JWT token.
    - **token_type** (`str`): The type of token. Always 'bearer'.

    ### Raises:
    - **EntityAlreadyExists**: If the user with the provided email already exists.

    ### Example Request:
    ```json
    {
      "email": "newuser@example.com",
      "password": "password123",
      "created_at": "2025-01-21T00:00:00"
    }
    ```

    ### Example Response:
    ```json
    {
      "access_token": "your_jwt_token_here",
      "token_type": "bearer"
    }
    ```"""
    if (await db.execute(select(User).where(User.email == r.email))).scalar():
        logger.info('Existing user found')
        raise EntityAlreadyExists()

    cur_time = datetime.now(UTC)
    # noinspection PyTypeChecker
    new_user = User(email=r.email, password=pwd_context.hash(r.password.get_secret_value()),
                    created_at=cur_time, updated_at=cur_time)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    logger.info(f"User registered successfully: {r.email}")
    return {'token': create_access_token(new_user.id, new_user.email, new_user.role, security_settings),
            'token_type': 'bearer'}


@router.get("/")
def current(token: str, token_type: str = 'bearer') -> Payload:
    """Retrieve the current authenticated user's data from the provided JWT token.

    ### Request Parameters:
    - **token** (`str`): The JWT token to authenticate the user.
    - **token_type** (`str`, optional): The type of the token. Defaults to 'bearer'.

    ### Response:
    A `Payload` object containing the user's information, such as:
    - **id** (`int`): The user's ID.
    - **email** (`str`): The user's email.
    - **role** (`str`): The user's role.

    ### Raises:
    - **UnexpectedTokenType**: If an invalid token type is provided.

    ### Example Request:
    ```json
    {
      "token": "your_jwt_token_here",
      "token_type": "bearer"
    }
    ```

    ### Example Response:
    ```json
    {
      "id": 123,
      "email": "user@example.com",
      "role": "admin"
    }
    ```"""
    if token_type.lower() != 'bearer':
        raise UnexpectedTokenType()
    return get_current_user(token, security_settings)
