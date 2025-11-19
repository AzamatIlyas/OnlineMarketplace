from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.services.ad_like import AdLikeService
from app.services.chat import ChatService
from app.services.favourite import FavouriteService

router = APIRouter(
    prefix="/ads/{id}",
    tags=["Ad favourites or likes"]
)

@router.post("/favourites")
async def add_favourites(id: int, user: User = Depends(get_current_user)):
    return await FavouriteService.add_my_favourites(ad_id=id, user_id=user.id)

@router.delete("/favourites")
async def delete_favourites(id: int, user: User = Depends(get_current_user)):
    return await FavouriteService.remove_my_favourites(ad_id=id, user_id=user.id)


@router.post("/likes")
async def add_likes(id: int, user: User = Depends(get_current_user)):
    return await AdLikeService.add_like(ad_id=id, user_id=user.id)

@router.delete("/likes")
async def remove_likes(id: int, user: User = Depends(get_current_user)):
    return await AdLikeService.remove_like(ad_id=id, user_id=user.id)

@router.post("/chat")
async def create_chat(id: int, user: User = Depends(get_current_user)):
    return await ChatService.create_chat(ad_id=id, user_id=user.id)