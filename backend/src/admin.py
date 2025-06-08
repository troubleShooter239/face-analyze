import base64
import binascii
import secrets

from fastapi import FastAPI
from sqladmin import Admin, ModelView
from starlette.authentication import AuthCredentials, AuthenticationBackend, AuthenticationError, SimpleUser
from starlette.requests import HTTPConnection
from starlette.responses import Response, JSONResponse
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware

from .models import Admin as AdminModel
from .database import engine
from .utils.config import admin_settings


class BasicAuthMiddleware(AuthenticationMiddleware):
    def default_on_error(self, conn: HTTPConnection, exc: Exception) -> Response: # type: ignore
        if isinstance(exc, AuthenticationError):
            return JSONResponse(
                status_code=401,
                content={"message": "Basic authentication"},
                headers={"WWW-Authenticate": "Basic"}
            )
        else:
            return super().default_on_error(conn, exc)


class BasicAuthBackend(AuthenticationBackend):
    admin_username = admin_settings.username
    admin_password = admin_settings.password.get_secret_value()

    async def authenticate(self, conn: HTTPConnection) -> tuple[AuthCredentials, SimpleUser]:
        if "Authorization" not in conn.headers:
            raise AuthenticationError('Invalid basic auth credentials')
        auth = conn.headers["Authorization"]
        try:
            scheme, credentials = auth.split()
            if scheme.lower() != 'basic':
                raise AuthenticationError('Invalid basic auth credentials')

            decoded = base64.b64decode(credentials).decode("ascii")
        except (ValueError, UnicodeDecodeError, binascii.Error) as exc:
            raise AuthenticationError('Invalid basic auth credentials')

        username, _, password = decoded.partition(":")
        if not secrets.compare_digest(username, self.admin_username) and \
            secrets.compare_digest(password, self.admin_password):
            raise AuthenticationError('Invalid basic auth credentials')

        return AuthCredentials(["authenticated"]), SimpleUser(username)


class UserAdmin(ModelView, model=AdminModel):
    column_list = [AdminModel.id, AdminModel.email, AdminModel.role]
    # column_searchable_list = [User.id, User.email, User.role]
    # column_sortable_list = [User.id, User.created_at, User.updated_at]

    name = "Admin"
    icon = "fa-solid fa-user"


def create_admin_panel(app: FastAPI,):
    admin = Admin(
        app,
        engine,
        title='Face Analyze Admin Panel',
        middlewares=[Middleware(BasicAuthMiddleware, backend=BasicAuthBackend())]
    )

    for i in UserAdmin,:
        admin.add_model_view(i)
