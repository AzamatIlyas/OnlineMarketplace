from fastapi import APIRouter, Response, Cookie

from app.schemas.auth import SUserRegister, SUserLogin
from app.services.auth import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register")
async def register_user(user: SUserRegister):
    return await AuthService.register(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password
    )

@router.post("/login")
async def login_user(response: Response, user: SUserLogin):
    return await AuthService.login(response=response, email=user.email, password=user.password)

@router.post("/logout")
async def logout_user(response: Response):
    return await AuthService.logout(response)

@router.post("/refresh")
async def refresh(response: Response, refresh_token: str = Cookie(None, alias="refresh_token")):
    return await AuthService.refresh(response, refresh_token)

