from sqlalchemy import select, insert
from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.models.chat import Chat
from app.db.repository.base import BaseDAO


class ChatDAO(BaseDAO):
    model = Chat

    @classmethod
    async def get_user_chats(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.buyer_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def create_chat(cls, ad_id: int, user_id: int):
        async with async_session_maker() as session:
            query = select(Ad).where(Ad.id == ad_id)
            result = await session.execute(query)
            ad = result.scalars().all()
            query = insert(cls.model).values(ads_id=ad_id, buyer_id=user_id, seller_id=ad.user_id)
            await session.execute(query)
            await session.commit()
            
