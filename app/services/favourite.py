from app.db.repository.favourite import FavouriteDAO
from app.schemas.ad import SAdCreate


class FavouriteService:

    @classmethod
    async def get_my_favourites(cls, user_id: int):
        return await FavouriteDAO.get_my_favourites(user_id)

    @classmethod
    async def add_my_favourites(cls, ad_id: int, user_id: int):
        return await FavouriteDAO.add(ad_id=ad_id, user_id=user_id)

    @classmethod
    async def remove_my_favourites(cls, ad_id: int, user_id: int):
        return await FavouriteDAO.delete(ad_id=ad_id, user_id=user_id)
