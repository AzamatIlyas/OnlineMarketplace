from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from app.core.settings import settings


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form.get("username")
        password = form.get("password")

        if (
            username == settings.ADMIN_USERNAME
            and password == settings.ADMIN_PASSWORD
        ):
            # ОБЯЗАТЕЛЬНО сохраняем что-то в session
            request.session["admin"] = True
            return True

        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        # Проверяем session
        return request.session.get("admin", False)


authentication_backend = AdminAuth(
    secret_key=settings.SECRET_KEY
)
