from sqlalchemy import Column, Integer, String, Boolean, Numeric, DateTime, ForeignKey

from app.db.base import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)
    amount = Column(Numeric, nullable=False)
    created_at = Column(DateTime, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    status = Column(String, nullable=False)
    transaction_id = Column(String)