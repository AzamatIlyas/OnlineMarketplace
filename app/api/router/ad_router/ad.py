from typing import Optional, Union

from fastapi import APIRouter, Depends, UploadFile, Form, File

from app.api.dependencies import get_current_user
from app.db.models.user import User
from app.schemas.ad import SAdCreate, SAdPublic
from app.services.ad import AdService
from app.services.favourite import FavouriteService

router = APIRouter(
    prefix="/ads",
    tags=["ads"]
)

@router.get("", response_model=list[SAdPublic])
async def get_all():
    return await AdService.get_all()

@router.post("")
async def create_ad(category_id: int = Form(...),title: str = Form(...),
                    price: float = Form(...), description: str = Form(...),
                    file: Union[UploadFile, str] = File(None), user: User = Depends(get_current_user)):
    print("aaaa")
    return await AdService.create_ad(category_id=category_id, description=description,
                                   price=price, title=title, file=file, user_id=user.id)

@router.get("/search")
async def search_ad_by_name(name: str):
    return await AdService.search_ad_by_name(name=name)

@router.get("/recommendations")
async def recommendation_ads(user: User = Depends(get_current_user)):
    return await AdService.recommendation_ads(user_id=user.id)

@router.get("/{id}")
async def get_by_id(id: int, user: User = Depends(get_current_user)):
    return await AdService.get_by_id(ad_id=id, user_id=user.id)

@router.put("/{id}")
async def update_by_id(id: int, ad: SAdCreate, user: User = Depends(get_current_user)):
    return await AdService.update_ad(id=id, ad=ad, user_id=user.id)

@router.delete("/{id}")
async def delete_ad_by_id(id: int, user: User = Depends(get_current_user)):
    return await AdService.delete_ad(id=id, user_id=user.id)

