from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import aiofiles
import os
import uuid
from sqlalchemy import select

from fastapi import HTTPException
from starlette.datastructures import UploadFile

from app.db.models.ad import Ad
from app.db.repository.ad import AdDAO
from app.db.repository.user_history import UserHistoryDAO
from app.schemas.ad import SAdCreate


class AdService:

    @classmethod
    async def get_all(cls):
        return await AdDAO.get_all()

    @classmethod
    async def get_by_id(cls, ad_id: int, user_id: int):
        ad = await AdDAO.get_one_or_none(id=ad_id)
        await UserHistoryDAO.add(user_id=user_id, ad_id=ad_id)
        await UserHistoryDAO.leave_limited_ads(user_id=user_id)
        return ad

    # @classmethod
    # async def recommendation_ads(cls, user_id: int):
    #     last_view = await UserHistoryDAO.get_last_views(user_id=user_id)

    #     if not last_view:
    #         return []

    #     last_view_id = last_view.ad_id
    #     recommendations = await cls.get_similar_ads_async(ad_id=last_view_id)
    #     return recommendations

    @classmethod
    async def get_new_ads_async(cls, exclude_ids: set[int], limit: int):
        return await AdDAO.get_new_ads_async(exclude_ids=exclude_ids, limit=limit)


    @classmethod
    async def recommendation_ads(cls, user_id: int, limit: int = 20):
        last_view = await UserHistoryDAO.get_last_views(user_id=user_id)

        recommendations = []

        
        if last_view:
            recommendations = await cls.get_similar_ads_async(
                ad_id=last_view.ad_id,
                limit=limit
            )

        if len(recommendations) < limit:
            existing_ids = {ad.id for ad in recommendations}

            new_ads = await cls.get_new_ads_async(
                exclude_ids=existing_ids,
                limit=limit - len(recommendations)
            )

            recommendations.extend(new_ads)

        return recommendations

    @classmethod
    async def create_ad(cls, category_id: int, description: str, price: float,
                        title: str, file: UploadFile, user_id: int):

        if not file:
            return await AdDAO.add(category_id=category_id, description=description,
                                   price=price, title=title, user_id=user_id)
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Content type not supported")

        extension = file.filename.split(".")[-1]
        uniqie_name = f"{uuid.uuid4().hex}.{extension}"
        filepath =os.path.join("app/static/images", uniqie_name)

        async with aiofiles.open(filepath, "wb") as new_file:
            content = await file.read()
            await new_file.write(content)

        image_url = f"static/images/{uniqie_name}"
        return await AdDAO.add(category_id=category_id, description=description,
                                   price=price, title=title, user_id=user_id, image_url=image_url)

    @classmethod
    async def update_ad(cls,id: int, ad: SAdCreate, user_id: int):
        existing_ad = await cls.get_by_id(id)
        if not ad or user_id != existing_ad.user_id:
            raise HTTPException(status_code=403)
        return await AdDAO.update(id=id, category_id=ad.category_id, description=ad.description,
                                  price=ad.price, title=ad.title)

    @classmethod
    async def delete_ad(cls, id, user_id: int):
        ad = await cls.get_by_id(id)
        if not ad or user_id != ad.user_id:
            raise HTTPException(status_code=403)
        return await AdDAO.delete(id=id)

    @classmethod
    async def search_ad_by_name(cls, name: str):
        return await AdDAO.search_ad_by_name(name=name)


    @classmethod
    async def get_similar_ads_async(cls, ad_id: int, top_n: int = 5):

        ads = await AdDAO.get_all()

        if not ads:
            return []

        # 2. Строим TF-IDF матрицу по title + description + category
        texts = [f"{ad.title} {ad.description} category_{ad.category_id}" for ad in ads]
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform(texts)

        similarity_matrix = cosine_similarity(tfidf_matrix)

        # 3. Находим индекс текущего объявления
        try:
            index = next(i for i, ad in enumerate(ads) if ad.id == ad_id)
        except StopIteration:
            return []

        # 4. Получаем топ-N похожих объявлений
        scores = list(enumerate(similarity_matrix[index]))
        scores = sorted(scores, key=lambda x: x[1], reverse=True)

        similar_ads = [
            {
                "id": ads[i].id,
                "title": ads[i].title,
                "description": ads[i].description,
                "price": float(ads[i].price),
                "image_url": ads[i].image_url,
                "score": float(score)
            }
            for i, score in scores[1: top_n + 1]  # исключаем сам ad_id
        ]

        return similar_ads


