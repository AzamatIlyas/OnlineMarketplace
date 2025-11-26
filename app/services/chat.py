from fastapi import WebSocket

from app.db.repository.chat import ChatDAO
from app.services.websocket_manager import manager


class ChatService:

    @classmethod
    async def get_user_chats(cls, user_id: int):
        return await ChatDAO.get_user_chats(user_id=user_id)

    @classmethod
    async def create_chat(cls, ad_id: int, user_id: int):
        return await ChatDAO.create_chat(ad_id=ad_id, user_id=user_id)
