from fastapi import APIRouter

from app.schemas.category import SCategory
from app.schemas.user import SUserPublic
from app.services.category import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)

@router.get("")
async def get_all_categories():
    return await CategoryService.get_all_categories()

@router.post("")
async def create_category(category: SCategory):
    return await CategoryService.create_category(category)


@router.get("/{id}")
async def get_category_by_id(id: int):
    return CategoryService.get_by_id(id=id)

@router.get("/{id}/ads")
async def get_ads_by_category(id: int):
    return await CategoryService.get_ads_by_category(id=id)