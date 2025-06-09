from pydantic import BaseModel


class Region(BaseModel):
    x: int
    y: int
    w: int
    h: int


class AnalyzeProcessedFace(BaseModel):
    region: Region
    age: float | None = None
    face_confidence: float | None = None
    dominant_gender: str | None = None
    gender: dict[str, float] | None = None
    dominant_emotion: str | None = None
    emotion: dict[str, float] | None = None
    dominant_race: str | None = None
    race: dict[str, float] | None = None


AnalyzeResponse = list[AnalyzeProcessedFace] | list


class AnalyzeResult(BaseModel):
    result: AnalyzeResponse


class FacialArea(BaseModel):
    x: int
    y: int
    w: int
    h: int
    left_eye: list[int]
    right_eye: list[int]


class FacialAreas(BaseModel):
    img1: Region
    img2: Region


class FaceDetectionResult(BaseModel):
    facial_area: FacialArea
    confidence: float
    is_real: bool | None = None
    antispoof_score: float | None = None


ExtractFacesResponse = list[FaceDetectionResult] | list


class ExtractFacesResult(BaseModel):
    result: ExtractFacesResponse


class VerifyResponse(BaseModel):
    verified: bool
    distance: float
    threshold: float
    model: str
    # distance_metric: str
    facial_areas: FacialAreas
    time: float
