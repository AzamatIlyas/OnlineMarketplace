from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Numeric
from sqlalchemy.orm import relationship

from app.db.base import Base

class Ad(Base):
    __tablename__ = "ads"

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    price = Column(Numeric, nullable=False)
    title = Column(String, nullable=False)
    updated_at = Column(DateTime, nullable=True, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String, default="https://avatars.mds.yandex.net/i?id=94e1ac21200e722e68add82c7451d22c1de826f5-4820979-images-thumbs&n=13")


    user = relationship("User", back_populates="ad")


    def __str__(self):
        return f"{self.id}: {self.title}"