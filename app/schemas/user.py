from pydantic import BaseModel


class SUser(BaseModel):
    name: str
    is_banned: bool
    is_verified: bool

class SUserPublic(SUser):
    id: int

    class Config:
        from_attributes=True
