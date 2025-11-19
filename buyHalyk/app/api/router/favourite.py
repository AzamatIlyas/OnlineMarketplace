
from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.services.favourite import FavouriteService

router = APIRouter(
    prefix="/favourites",
    tags=["Favourites"]
)


@router.get("")
async def get_my_favourites(user: User = Depends(get_current_user)):
    return await FavouriteService.get_my_favourites(user.id)
