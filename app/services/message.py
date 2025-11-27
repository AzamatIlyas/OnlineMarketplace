from app.db.repository.chat import ChatDAO
from app.db.repository.message import MessageDAO
from fastapi import HTTPException

class MessageService:

    @classmethod
    async def get_message(cls, chat_id: int, user_id: int):
        chat = await ChatDAO.get_user_chat(user_id=user_id, chat_id=chat_id)
        return await MessageDAO.get_messages(chat_id)