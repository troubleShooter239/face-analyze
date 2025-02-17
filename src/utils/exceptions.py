from fastapi import HTTPException
from starlette import status

from .constants import ENTITY_ALREADY_EXISTS, INCORRECT_PASSWORD, VALIDATE_CREDENTIALS_ERROR, USER_NOT_FOUND, \
    INVALID_DATA_STORED, UNEXPECTED_TOKEN_TYPE, USER_NOT_ADMIN


class EntityAlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, ENTITY_ALREADY_EXISTS)


class IncorrectPassword(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, INCORRECT_PASSWORD)


class ValidateCredentialsError(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_401_UNAUTHORIZED, VALIDATE_CREDENTIALS_ERROR, {"WWW-Authenticate": "Bearer"})


class UserNotFound(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_404_NOT_FOUND, USER_NOT_FOUND)


class InvalidDataStored(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_500_INTERNAL_SERVER_ERROR, INVALID_DATA_STORED)


class UnexpectedTokenType(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, UNEXPECTED_TOKEN_TYPE)


class InvalidField(HTTPException):
    def __init__(self, field_name: str):
        super().__init__(status.HTTP_400_BAD_REQUEST, f'Invalid field: {field_name}')


class UserIsNotAdmin(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, USER_NOT_ADMIN)


class UserIsAdmin(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, 'User is admin')
