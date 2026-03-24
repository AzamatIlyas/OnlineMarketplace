from pydantic import BaseModel, EmailStr


class SUserLogin(BaseModel):
    email: EmailStr
    password: str

class SUserRegister(SUserLogin):
    full_name: str
