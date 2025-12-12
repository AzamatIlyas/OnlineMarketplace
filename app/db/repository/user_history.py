from app.db.base import async_session_maker
from app.db.models.user_history import UserHistory
from app.db.repository.base import BaseDAO
from sqlalchemy import select, delete


class UserHistoryDAO(BaseDAO):
    model = UserHistory

    @classmethod
    async def get_last_views(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter(cls.model.user_id == user_id).order_by(cls.model.viewed_at.desc()).limit(1)
            result = await session.execute(query)
            return result.scalars().first()

    @classmethod
    async def leave_limited_ads(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter(cls.model.user_id == user_id).order_by(cls.model.viewed_at.desc())
            result = await session.execute(query)
            all_views = result.scalars().all()

            if len(all_views) > 0:
                to_delete = all_views[20:]
                delete_query = delete(cls.model).where(cls.model.id.in_([v.id for v in to_delete]))
                await session.execute(delete_query)

            await session.commit()

    @classmethod
    async def get_limited_ads(cls, user_id: int, limit: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter(cls.model.user_id == user_id).order_by(cls.model.viewed_at.desc()).limit(limit)
            result = await session.execute(query)
            return result.scalars().all()