from pydantic import BaseModel, EmailStr, SecretStr

from src.schemas.users import AddUserRequest


class Payload(BaseModel):
    sub: str
    email: EmailStr
    admin: bool
    exp: float


class SignInRequest(BaseModel):
    email: EmailStr
    password: SecretStr


SignUpRequest = AddUserRequest


class Token(BaseModel):
    token: str
    token_type: str = 'bearer'
