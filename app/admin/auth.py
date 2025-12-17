from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

from app.core.settings import settings


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        email, password = form["email"], form["password"]

        # Validate credentials here
        if username == "admin" and password == "secret":
            request.session.update({"token": "some_secure_token"})
            return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")
        if not token:
            return False
        # Validate token here
        return True

authentication_backend = AdminAuth(secret_key=settings.ADMIN_SECRET_KEY)
