from typing import Sequence

from fastapi.openapi.models import License, Contact
from pydantic import BaseModel, SecretStr, PostgresDsn, HttpUrl


class DbSettings(BaseModel):
    dsn: PostgresDsn = PostgresDsn(f"postgresql+asyncpg://superuser:superpassword@localhost:5432/face-analyze")


class CORSSettings(BaseModel):
    allow_origins: Sequence[str] = ('*',)
    allow_credentials: bool = True
    allow_methods: Sequence[str] = ('*',)
    allow_headers: Sequence[str] = ('*',)


class SecuritySettings(BaseModel):
    secret_key: SecretStr = SecretStr('c46fa2c3f4d959c236d654bda3fff07c48b3f534537fc75f81ae4f85685b4577')
    algorithm: SecretStr = SecretStr('HS256')
    expire_hours: float = 30


class AppSettings(BaseModel):
    title: str = "Face Analyze API"
    version: str = "0.0.1"
    description: str = """This API combines advanced AI-powered image processing capabilities with a robust user management system.\n 
It provides tools for secure authentication, user data management, and AI-driven image analysis, 
making it ideal for applications that require face verification, facial attribute analysis, and user administration.

### Key Features:
- **AI Capabilities**:
    - Face verification: Verify if two images belong to the same person.
    - Facial attribute analysis: Analyze age, gender, emotions, and race from a photo.
    - Anti-spoofing: Detect potential image manipulation or spoofing attempts.
- **User Management**:
    - Create, update, and delete user accounts.
    - Fetch user profiles and manage user data.
- **Authentication**:
    - Secure sign-up and sign-in using hashed passwords and JWT token-based authentication.
    - Retrieve current user data through token verification.

### Use Cases:
This API is suitable for:
- **Access control systems** with AI-powered face recognition.
- **User-centric applications** requiring secure authentication and account management.
- **Photo analysis platforms** leveraging AI for insights into facial attributes.

Each endpoint is designed with security and scalability in mind, ensuring a smooth integration experience for developers."""
    # noinspection PyTypeChecker
    contact: Contact = Contact(
        name="troubleShooter239",
        url=HttpUrl("https://www.github.com/troubleShooter239"),
        email="morgun2282@gmail.com"
    )
    license: License = License(name="MIT", url=HttpUrl("https://opensource.org/licenses/MIT"))
    redoc_url: str | None = None


app_settings: AppSettings = AppSettings()
db_settings: DbSettings = DbSettings()
cors_settings: CORSSettings = CORSSettings()
security_settings: SecuritySettings = SecuritySettings()
