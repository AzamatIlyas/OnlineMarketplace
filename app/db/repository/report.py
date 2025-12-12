from sqlalchemy import select
from app.db.base import async_session_maker
from app.db.models.report import Report
from app.db.repository.base import BaseDAO


class ReportDAO(BaseDAO):
    model = Report

    @classmethod
    async def get_my_reports(cls, user_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.user_id == user_id)
            res = await session.execute(query)
            return await res.scalars().all()

    @classmethod
    async def get_my_report(cls, user_id: int, report_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.user_id == user_id, cls.model.report_id == report_id)
            res = await session.execute(query)
            return await res.scalars().all()

