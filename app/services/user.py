from app.db.models.user import User
from app.db.repository.user import UserDAO


class UserService:

    @classmethod
    async def get_all_users(cls):
        return await UserDAO.get_all()

    @classmethod
    async def update_me(cls, user: User):
        return await UserDAO.update(id=user.id, name=user.name)

    @classmethod
    async def get_my_ads(cls, user_id: int):
        return await UserDAO.get_my_ads(user_id)