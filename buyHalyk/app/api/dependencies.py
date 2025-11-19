from datetime import datetime

from fastapi import Response, Request, HTTPException, Depends
from jose import jwt, JWTError

from app.core.settings import settings
from app.db.repository.user import UserDAO


def get_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return token

async def get_current_user(token: str = Depends(get_token)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid access token")
    expire: str = payload.get("exp")
    if (not expire) and (int(expire) < datetime.utcnow().timestamp()):
        raise HTTPException(status_code=401)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid access token")
    user = await UserDAO.get_one_or_none(id=int(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user