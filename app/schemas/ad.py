from datetime import datetime

from pydantic import BaseModel


class SAdCreate(BaseModel):

    category_id: int
    description: str
    price: float
    title: str


class SAdPublic(SAdCreate):

    id: int
    image_url: str
    created_at: datetime
    updated_at: datetime
    user_id: int
    is_active: bool

    class Config:
        from_attributes=True

