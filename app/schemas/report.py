from pydantic import BaseModel

class SReportCreate(BaseModel):

    reason: str
    reported_id: int
    reporter_type: str