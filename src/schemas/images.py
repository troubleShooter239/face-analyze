from pydantic import BaseModel


class AddImg(BaseModel):
    user_id: int
    image: str
