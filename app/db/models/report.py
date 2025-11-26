from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey

from app.db.base import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, nullable=False)
    reason = Column(String, nullable=False)
    reported_id = Column(Integer, ForeignKey("reports.id"), nullable=False)
    reported_type = Column(String, nullable=False)
    reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, nullable=False)
    uploaded_at = Column(DateTime, nullable=False)