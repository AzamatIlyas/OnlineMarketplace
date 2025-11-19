from app.db.repository.category import CategoryDAO
from app.schemas.category import SCategory


class CategoryService:

    @classmethod
    async def get_all_categories(cls):
        return await CategoryDAO.get_all()

    @classmethod
    async def create_category(cls, category: SCategory):
        return await CategoryDAO.add(name=category.name)

    @classmethod
    async def get_by_id(cls, id: int):
        return await CategoryDAO.get_one_or_none(id=id)

    @classmethod
    async def get_ads_by_category(cls, id: int):
        return await CategoryDAO.get_ads_by_category(id=id)

