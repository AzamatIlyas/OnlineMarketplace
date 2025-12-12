from app.db.repository.user_history import UserHistoryDAO


class UserHistoryService:
    @classmethod
    async def get_user_history(cls, user_id: int):
        return await UserHistoryDAO.get_limited_ads(user_id=user_id, limit=20)