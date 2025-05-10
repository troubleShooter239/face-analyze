from pydantic import BaseModel, EmailStr, SecretStr


class AddUserRequest(BaseModel):
    email: EmailStr
    password: SecretStr
