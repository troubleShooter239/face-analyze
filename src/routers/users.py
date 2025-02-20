from datetime import datetime, UTC
from typing import Any

from pydantic import EmailStr
from sqlalchemy import select
from starlette import status

from src.dependencies import db_d, is_admin_d
from src.models import User
from src.routers import create_router
from src.schemas.users import AddUserRequest
from src.services.crud import create, update
from src.services.security import pwd_context
from src.utils.exceptions import EntityAlreadyExists, UserNotFound, InvalidField
from src.utils.logger import logger

router = create_router('/users', [is_admin_d], 'email', User, User.email, EmailStr)


@router.post('', status_code=status.HTTP_201_CREATED)
async def add_user(r: AddUserRequest, db: db_d) -> None:
    """Create a new user in the system.

    ### Request Body:
    - **email** (`str`): The user's email address. Must be unique.
    - **password** (`str`): The user's password. It is securely stored and never returned in the response.
    - **created_at** (`datetime`): The timestamp when the user was created.

    ### Response:
    - **201 Created**: Indicates that the user was successfully created.

    ### Raises:
    - **EntityAlreadyExists**: If the user with the provided email already exists.

    ### Example Request:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "created_at": "2025-01-21T00:00:00"
    }
    ```

    ### Example Response:
    HTTP Status: 201 Created"""
    if (await db.execute(select(User).where(User.email == r.email))).scalar():
        logger.info('Existing user found')
        raise EntityAlreadyExists()

    cur_time = datetime.now(UTC)
    new_user = User(email=str(r.email), password=pwd_context.hash(r.password.get_secret_value()), created_at=cur_time,
                    updated_at=cur_time)
    await create(db, new_user)


@router.patch('/{email}')
async def update_user(email: EmailStr, data: dict[str, Any], db: db_d) -> int:
    """Update a user's information by email.

    ### Request Parameters:
    - **email** (`str`): The email of the user to update.
    - **data** (`dict`): The fields to update and their new values. Only valid fields of the user model can be updated.

    ### Response:
    The ID of the updated user.

    ### Raises:
    - **UserNotFound**: If no user with the provided email is found.
    - **InvalidField**: If an invalid field is provided for update.

    ### Example Request:
    ```json
    {
      "email": "user@example.com",
      "data": {
        "password": "newpassword123"
      }
    }
    ```

    ### Example Response:
    ```json
    {
      "id": 123
    }
    ```"""
    user = (await db.execute(select(User).where(User.email == email))).scalar()
    if user is None:
        raise UserNotFound()

    for key, value in data.items():
        if hasattr(user, key):
            if key != "password":
                setattr(user, key, value)
            else:
                setattr(user, key, pwd_context.hash(value))
        else:
            raise InvalidField(key)
    user.updated_at = datetime.now(UTC)
    await update(db, user)
    return user.id
