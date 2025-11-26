from sqlalchemy import select, delete

from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.models.ad_like import AdLike
from app.db.repository.base import BaseDAO


class AdLikeDAO(BaseDAO):
    model = AdLike

    @classmethod
    async def get_ad_like(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(Ad).join(cls.model, Ad.id == cls.model.ad_id).where(cls.model.user_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def remove_like(cls, ad_id: int, user_id: int):
        async with async_session_maker() as session:
            query = delete(cls.model).where(cls.model.ad_id == ad_id, cls.model.user_id == user_id)
            await session.execute(query)
            await session.commit()

