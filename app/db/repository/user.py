from app.db.models.user import User
from app.db.repository.base import BaseDAO


class UserDAO(BaseDAO):
    model = User