
from fastapi import APIRouter
from fastapi.params import Depends

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.schemas.user import SUserPublic
from app.services.report import ReportService
from app.services.user import UserService

router = APIRouter(
    prefix="/api/users",
    tags=["User"]
)


@router.get("/", response_model=list[SUserPublic])
async def get_all_users():
    return await UserService.get_all_users()

@router.get("/me", response_model=SUserPublic)
async def get_me(user: User = Depends(get_current_user)):
    return user

@router.get("/me/private")
async def get_me_private(user: User = Depends(get_current_user)):
    return {"id": user.id,
            "email": user.email
            }



@router.get("/reports")
async def get_my_reports(user: User = Depends(get_current_user)):
    return await ReportService.get_my_reports(user_id=user.id)



@router.get("/reports/{report_id}")
async def get_my_report(report_id: int, user: User = Depends(get_current_user)):
    return await ReportService.get_my_report(report_id=report_id, user_id=user.id)


@router.get("/ads")
async def get_my_ads(user: User = Depends(get_current_user)):
    return await UserService.get_my_ads(user_id=user.id)