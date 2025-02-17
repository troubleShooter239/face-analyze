from pydantic import BaseModel, EmailStr, SecretStr, Field


class AddAdminRequest(BaseModel):
    email: EmailStr
    password: SecretStr
    name: str = Field(min_length=1)
