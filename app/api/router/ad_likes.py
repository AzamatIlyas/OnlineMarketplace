from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.services.ad_like import AdLikeService

router = APIRouter(
    prefix="/api/likes",
    tags=["Likes"]
)

@router.get("")
async def get_likes(user: User = Depends(get_current_user)):
    return await AdLikeService.get_liked_ads(user_id=user.id)