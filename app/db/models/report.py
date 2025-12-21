from datetime import datetime

from sqlalchemy.orm import relationship

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey

from app.db.base import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    reason = Column(String, nullable=False)
    reported_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    reported_type = Column(String, nullable=False)
    reporter_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status = Column(String, default="Send")
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", foreign_keys=[reporter_id], back_populates="report")


    def __str__(self):
        return f"{self.id}: {self.reporter_id} - {self.reported_id}"
        