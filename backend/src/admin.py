import base64
import binascii
import secrets

from fastapi import FastAPI
from sqladmin import ModelView
from sqladmin import Admin as create_panel

from starlette.authentication import AuthCredentials, AuthenticationBackend, AuthenticationError, SimpleUser
from starlette.requests import HTTPConnection
from starlette.responses import Response, JSONResponse
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware

from .models import Admin, User, AIResult, Image, Log, AdminLog
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


class Admin_(ModelView, model=Admin):
    column_list = [Admin.id, Admin.email, Admin.name]
    column_searchable_list = [Admin.id, Admin.email, Admin.name]
    column_sortable_list = [Admin.id]

    name = "Admin"
    icon = "fa-solid fa-user"


class User_(ModelView, model=User):
    column_list = [User.id, User.email, User.created_at]
    column_searchable_list = [User.id, User.email]
    column_sortable_list = [User.id, User.created_at, User.updated_at]
    
    name = 'User'
    icon = "fa-solid fa-user"


class AIResult_(ModelView, model=AIResult):
    column_list = [AIResult.id, AIResult.image_id, AIResult.metric_name, AIResult.metric_value, AIResult.analyzed_at]
    column_searchable_list = [AIResult.id, AIResult.metric_name]
    column_sortable_list = [AIResult.id, AIResult.analyzed_at]

    name = "AI Result"
    icon = "fa-solid fa-microchip"
    
    
class Image_(ModelView, model=Image):
    column_list = [Image.id, Image.user_id, Image.image]
    column_searchable_list = [Image.id, Image.image]
    column_sortable_list = [Image.id]

    name = "Image"
    icon = "fa-solid fa-image"


class Log_(ModelView, model=Log):
    column_list = [Log.id, Log.user_id, Log.time, Log.action]
    column_searchable_list = [Log.id, Log.action]
    column_sortable_list = [Log.id, Log.time]

    name = "User Log"
    icon = "fa-solid fa-scroll"
    

class AdminLog_(ModelView, model=AdminLog):
    column_list = [AdminLog.id, AdminLog.admin_id, AdminLog.time, AdminLog.action]
    column_searchable_list = [AdminLog.id, AdminLog.action]
    column_sortable_list = [AdminLog.id, AdminLog.time]

    name = "Admin Log"
    icon = "fa-solid fa-clipboard-list"

    

def create_admin_panel(app: FastAPI,):
    admin = create_panel(
        app,
        engine,
        title='Face Analyze Admin Panel',
        middlewares=[Middleware(BasicAuthMiddleware, backend=BasicAuthBackend())]
    )

    for i in Admin_, User_, AIResult_, Image_, Log_, AdminLog_:
        admin.add_model_view(i)
