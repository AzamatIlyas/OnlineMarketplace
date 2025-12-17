from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    is_banned = Column(Boolean, nullable=False, default=False)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String)

    ad = relationship("Ad", back_populates="user")


    def __str__(self):
        return f"{self.email}"