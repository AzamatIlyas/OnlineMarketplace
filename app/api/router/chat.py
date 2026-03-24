from fastapi import APIRouter, Depends, WebSocket

from app.api.dependencies import get_current_user
from app.db.models.chat import Chat
from app.db.models.user import User
from app.schemas.message import SMessage
from app.services.chat import ChatService
from app.services.message import MessageService
from app.services.websocket import WebsocketService

router = APIRouter(
    prefix="/api/chats",
    tags=["Chat"]
)

@router.get("")
async def get_user_chats(user: User = Depends(get_current_user)):
    return await ChatService.get_user_chats(user_id=user.id)

@router.post("")
async def create_chat(ad_id: int, user: User = Depends(get_current_user)):
    return await ChatService.create_chat(ad_id=ad_id, user_id=user.id)

@router.get("/{chat_id}/messages", response_model=list[SMessage])
async def get_chat_messages(chat_id: int, user: User = Depends(get_current_user)):
    return await MessageService.get_message(chat_id=chat_id, user_id=user.id)

@router.websocket("/ws/{chat_id}")
async def chat_ws(
        chat_id: int,
        websocket: WebSocket
):
    return await WebsocketService.chat_message(
        chat_id=chat_id,
        websocket=websocket
    )