from datetime import datetime, timedelta

from fastapi import HTTPException, Response, Cookie
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import EmailStr

from app.core.settings import settings
from app.db.repository.user import UserDAO

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    @classmethod
    def get_password_hash(cls, password) -> str:
        return pwd_context.hash(password)

    @classmethod
    def verify_password(cls, plain_password, hashed_password) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @classmethod
    async def authenticate_user(cls, email: EmailStr, password: str):
        user = await UserDAO.get_one_or_none(email=email)
        if not user or cls.verify_password(password, user.password_hash):
            return None
        return user

    @classmethod
    def create_access_token(cls, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
        )
        return encoded_jwt

    @classmethod
    def create_refresh_token(cls, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=7)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.REFRESH_KEY, algorithm=settings.ALGORITHM)

    @classmethod
    def verify_token(cls, token: str, key: str):
        try:
            payload = jwt.decode(token, key, algorithms=[settings.ALGORITHM])
            return payload
        except JWTError:
            return None

    @classmethod
    async def register(cls, name: str, email: EmailStr, password: str):
        existing_user = await UserDAO.get_one_or_none(email=email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed_password = pwd_context.hash(password)
        return await UserDAO.add(name=name, email=email, password_hash=hashed_password)

    @classmethod
    async def login(cls,response: Response, email: EmailStr, password: str):
        existing_user = await UserDAO.get_one_or_none(email=email)
        if not existing_user or not cls.verify_password(password, existing_user.password_hash):
            return "Error"
        access_token = cls.create_access_token({"sub": str(existing_user.id)})
        refresh_token = cls.create_refresh_token({"sub": str(existing_user.id)})

        response.set_cookie("access_token", access_token, httponly=True)
        response.set_cookie("refresh_token", refresh_token, httponly=True)
        return {"message": "Successfully logged in"}

    @classmethod
    async def logout(cls, response: Response):
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return {"message": "Successfully logged out"}

    @classmethod
    async def refresh(cls, response: Response, refresh_token: str):
        if not refresh_token:
            raise HTTPException(status_code=401, detail="Missing refresh token")

        try:
            payload = jwt.decode(refresh_token, settings.REFRESH_KEY, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid refresh token 1")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token 2")

        access_token = cls.create_access_token({"sub": str(user_id)})
        refresh_token = cls.create_refresh_token({"sub": str(user_id)})

        response.set_cookie("access_token", access_token, httponly=True)
        response.set_cookie("refresh_token", refresh_token, httponly=True)

        return {"message": "Successfully refreshed"}


