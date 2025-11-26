from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey

from app.db.base import Base

class Notification(Base):
    __tablename__ = "norifications"

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, nullable=False)
    is_read = Column(Boolean, nullable=False, default=False)
    text = Column(String, nullable=False)
    type = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))