from sqlalchemy import insert

from app.db.base import async_session_maker
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