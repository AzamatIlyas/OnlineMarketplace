from app.db.repository.message import MessageDAO


class MessageService:

    @classmethod
    async def get_message(cls, chat_id: int):
        return await MessageDAO.get_messages(chat_id)