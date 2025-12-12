from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.db.models.report import Report
from app.db.models.user import User
from app.schemas.report import SReportCreate
from app.services.report import ReportService

router = APIRouter(
    prefix="/report",
    tags=["Report"],
)

@router.get("/")
async def get_reports():
    return await ReportService.get_reports()

@router.post("/")
async def create_report(report: SReportCreate, user: User = Depends(get_current_user)):
    return await ReportService.create_report(report=report, user_id=user.id)

@router.get("/{report_id}")
async def get_report(report_id: int):
    return await ReportService.get_report(report_id=report_id)


