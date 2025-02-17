from datetime import datetime

from pydantic import BaseModel


class AddLogs(BaseModel):
    id: int
    time: datetime
    action: str
