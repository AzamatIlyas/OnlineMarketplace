import aiofiles
import os
import uuid

from fastapi import HTTPException
from starlette.datastructures import UploadFile

from app.db.repository.ad import AdDAO
from app.schemas.ad import SAdCreate


class AdService:

    @classmethod
    async def get_all(cls):
        return await AdDAO.get_all()

    @classmethod
    async def get_by_id(cls, id):
        return await AdDAO.get_one_or_none(id=id)

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

