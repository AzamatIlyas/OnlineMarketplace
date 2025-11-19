from sqlalchemy import Column, Integer, String, ForeignKey

from app.db.base import Base

class AdImage(Base):
    __tablename__ = "ad_images"

    id = Column(Integer, primary_key=True)
    ad_id = Column(Integer, ForeignKey("ad_images.id"), nullable=False)
    image_url = Column(String, nullable=False)