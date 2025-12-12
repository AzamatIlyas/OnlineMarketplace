from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from app.db.base import Base

class UserHistory(Base):
    __tablename__ = "user_history"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    ad_id = Column(Integer, ForeignKey("ads.id", ondelete="CASCADE"))
    viewed_at = Column(DateTime, default=datetime.utcnow)
