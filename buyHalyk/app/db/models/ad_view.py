from sqlalchemy import Column, Integer, ForeignKey, DateTime

from app.db.base import Base

class AdView(Base):
    __tablename__ = "ad_views"

    id = Column(Integer, primary_key=True)
    ad_id = Column(Integer, ForeignKey("ads.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)