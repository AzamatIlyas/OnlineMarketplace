from datetime import datetime

from pydantic import BaseModel

class SMessage(BaseModel):
    id: int
    sender_id: int
    text: str
    created_at: datetime

    class Config:
        from_attributes = True
