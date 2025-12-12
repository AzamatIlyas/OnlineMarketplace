from app.db.repository.report import ReportDAO
from app.schemas.report import SReportCreate


class ReportService:

    @classmethod
    async def get_reports(cls):
        return await ReportDAO.get_all()

    @classmethod
    async def get_report(cls, report_id: int):
        return await ReportDAO.get_one_or_none(id=report_id)

    @classmethod
    async def create_report(cls, report: SReportCreate, user_id: int):
        return await ReportDAO.add(reason=report.reason,
                                   reported_id=report.reported_id,
                                   reporter_id=user_id,
                                   reported_type=report.reported_type)


    @classmethod
    async def delete_report(cls, report_id: int):
        return await ReportDAO.delete(id=report_id)

    @classmethod
    async def get_my_reports(cls, user_id: int):
        return await ReportDAO.get_my_reports(user_id=user_id)

    @classmethod
    async def get_my_report(cls, user_id: int, report_id: int):
        return await ReportDAO.get_my_report(report_id=report_id, user_id=user_id)

