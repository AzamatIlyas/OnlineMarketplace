from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.services.user_history import UserHistoryService

router = APIRouter(
    prefix="/api/view-history",
    tags=["user-history"],
)

@router.get("/")
async def user_view_history(user: User = Depends(get_current_user)):
    return await UserHistoryService.get_user_history(user_id=user.id)
