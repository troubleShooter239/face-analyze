from fastapi import HTTPException
from starlette import status


class EntityAlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, "Entity already exists")


class IncorrectPassword(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, "Incorrect password")


class ValidateCredentialsError(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_401_UNAUTHORIZED, "Could not validate credentials",
                         {"WWW-Authenticate": "Bearer"})


class EntityNotFound(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_404_NOT_FOUND, "Entity not found")


class UserNotFound(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_404_NOT_FOUND, "User not found")


class InvalidDataStored(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_500_INTERNAL_SERVER_ERROR, "Invalid data stored in database")


class UnexpectedTokenType(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_400_BAD_REQUEST, "Unexpected token type")


class InvalidField(HTTPException):
    def __init__(self, field_name: str):
        super().__init__(status.HTTP_400_BAD_REQUEST, f'Invalid field: {field_name}')


class UserIsNotAdmin(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, "User is not admin")


class UserIsAdmin(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_403_FORBIDDEN, 'User is admin')
