from sqlalchemy import select

from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.models.category import Category
from app.db.repository.base import BaseDAO


class CategoryDAO(BaseDAO):
    model = Category

    @classmethod
    async def get_ads_by_category(cls, id: int):
        async with async_session_maker() as session:
            query = select(Ad).where(Ad.category_id == id)
            result = await session.execute(query)
            return result.scalars().all()
