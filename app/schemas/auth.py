from pydantic import BaseModel, EmailStr


class SUserLogin(BaseModel):
    email: EmailStr
    password: str

class SUserRegister(SUserLogin):
    first_name: str
    last_name: str
