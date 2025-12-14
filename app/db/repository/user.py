from app.db.base import async_session_maker
from app.db.models.ad import Ad
from app.db.models.user import User
from app.db.repository.base import BaseDAO
from sqlalchemy import select


class UserDAO(BaseDAO):
    model = User

    @classmethod
    async def get_my_ads(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(Ad).where(Ad.user_id == user_id)
            result = await session.execute(query)
            return result.scalars().all()