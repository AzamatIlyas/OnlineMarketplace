from datetime import datetime

from sqlalchemy import Column, Integer, ForeignKey, DateTime

from app.db.base import Base

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True)
    ad_id = Column(Integer, ForeignKey("ads.id"), nullable=False)
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)