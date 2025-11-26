from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey

from app.db.base import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    comment = Column(String)
    created_at = Column(DateTime, nullable=False)
    rating = Column(Integer)
    reviewed_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)