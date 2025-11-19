from datetime import datetime

from sqlalchemy import Column, Integer, ForeignKey, DateTime

from app.db.base import Base

class Favourite(Base):
    __tablename__ = "favourites"

    id = Column(Integer, primary_key=True)
    ad_id = Column(Integer, ForeignKey("ads.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
