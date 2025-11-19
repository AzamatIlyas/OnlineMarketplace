
from sqlalchemy import select, delete

from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.models.favourite import Favourite
from app.db.repository.base import BaseDAO


class FavouriteDAO(BaseDAO):
    model = Favourite

    @classmethod
    async def get_my_favourites(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(Ad).join(cls.model, Ad.id == cls.model.ad_id).where(cls.model.user_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def delete(cls, ad_id: int, user_id: int):
        async with async_session_maker() as session:
            query = delete(cls.model).where(cls.model.ad_id == ad_id, cls.model.user_id == user_id)
            await session.execute(query)
            await session.commit()
            return {"message": "success"}