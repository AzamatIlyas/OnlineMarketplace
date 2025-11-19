from app.db.repository.ad_like import AdLikeDAO


class AdLikeService:

    @classmethod
    async def get_liked_ads(cls, user_id: int):


        return await AdLikeDAO.get_ad_like(user_id)

    @classmethod
    async def add_like(cls, ad_id: int, user_id: int):
        return await AdLikeDAO.add(ad_id=ad_id, user_id=user_id)

    @classmethod
    async def remove_like(cls, ad_id: int, user_id: int):
        return await AdLikeDAO.remove_like(ad_id=ad_id, user_id=user_id)

