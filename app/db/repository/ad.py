from sqlalchemy import select

from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.repository.base import BaseDAO


class AdDAO(BaseDAO):
    model = Ad

    @classmethod
    async def search_ad_by_name(cls, name: str):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.title.ilike(f"%{name}%"))
            result = await session.execute(query)
            return result.scalars().all()
        

    @classmethod
    async def get_new_ads_async(cls, exclude_ids: set[int], limit: int):
        async with async_session_maker() as session:
            query = (
            select(Ad)
            .where(Ad.id.not_in(exclude_ids))
            .order_by(Ad.created_at.desc())
            .limit(limit)
        )

        result = await session.execute(query)
        return result.scalars().all()
