from fastapi import APIRouter, Depends, Response, Cookie

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.schemas.auth import SUserRegister, SUserLogin
from app.services.auth import AuthService

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

@router.post("/register")
async def register_user(user: SUserRegister):
    return await AuthService.register(
        full_name=user.full_name,
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

@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
    }
