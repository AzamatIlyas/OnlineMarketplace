from fastapi import APIRouter, Depends, WebSocket

from app.api.dependencies import get_current_user
from app.db.models.chat import Chat
from app.db.models.user import User
from app.services.chat import ChatService

router = APIRouter(
    prefix="/chats",
    tags=["Chat"]
)

@router.get("")
async def get_user_chats(user: User = Depends(get_current_user)):
    return await ChatService.get_user_chats(user_id=user.id)

@router.websocket("/ws/{chat_id}/{user_id}")
async def chat_ws(
        chat_id: int,
        user_id: int,
        websocket: WebSocket,
        user: User = Depends(get_current_user)
):
    return await