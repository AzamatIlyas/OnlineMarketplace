from sqlalchemy import insert, select, or_
from fastapi import HTTPException
from app.db.base import async_session_maker
from app.db.models.chat import Chat
from app.db.models.message import Message
from app.db.repository.base import BaseDAO


class MessageDAO(BaseDAO):
    model = Message

    @classmethod
    async def add(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data).returning(cls.model)
            result = await session.execute(query)
            await session.commit()

            message = result.fetchone()
            return message

    @classmethod
    async def get_messages(cls, chat_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.chat_id == chat_id)
            result = await session.execute(query)
            return result.scalars().all()