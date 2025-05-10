from base64 import b64encode
from datetime import UTC, datetime
from io import BytesIO

from PIL.Image import open
from deepface import DeepFace
from fastapi import APIRouter, File, UploadFile, Query
from numpy import array

from src.dependencies import db_d, is_user_d
from src.models import Image, AIResult
from src.schemas.ai import AnalyzeResult, AnalyzeProcessedFace, AnalyzeResponse, ExtractFacesResponse, \
    ExtractFacesResult, VerifyResponse
from src.services.security import get_current_user
from src.utils.config import security_settings
from src.utils.logger import logger

router = APIRouter(prefix='/ai', tags=['ai processing'], dependencies=[is_user_d])


@router.post('/analyze')
async def analyze(db: db_d, token: str, img: UploadFile = File(...),
                  actions: list[str] = Query(("emotion", "age", "gender", "race")),
                  anti_spoofing: bool = False) -> AnalyzeResponse:
    """Analyze facial attributes such as age, gender, emotion, and race in the provided image.

    ### Request Parameters:
    - **img** (`str` | `np.ndarray`):
      - The input image. Supported formats:
        - A string representing the file path of the image.
        - A NumPy array (BGR format).
        - A Base64-encoded image string.
      If the image contains multiple faces, analysis will be performed for each detected face.

    - **actions** (`tuple`, optional):
      - Attributes to analyze. Defaults to `('age', 'gender', 'emotion', 'race')`.
        You can customize the analysis by excluding one or more of these attributes.

    - **anti_spoofing** (`boolean`, optional):
      - A flag to enable anti-spoofing checks. Defaults to `False`.

    ### Response:
    A list of dictionaries, each representing the analysis results for a detected face. Each dictionary contains:

    - **region** (`dict`):
      The rectangular region of the detected face:
      - `x` (`int`): X-coordinate of the top-left corner.
      - `y` (`int`): Y-coordinate of the top-left corner.
      - `w` (`int`): Width of the detected face region.
      - `h` (`int`): Height of the detected face region.

    - **age** (`float`):
      The estimated age of the detected face.

    - **face_confidence** (`float`):
      The confidence score for the detected face, indicating the reliability of face detection.

    - **dominant_gender** (`str`):
      The dominant gender in the detected face (`"Man"` or `"Woman"`).

    - **gender** (`dict`):
      Confidence scores for each gender category:
      - `Man`: Confidence score for the male gender.
      - `Woman`: Confidence score for the female gender.

    - **dominant_emotion** (`str`):
      The dominant emotion in the detected face. Possible values include:
      `"sad"`, `"angry"`, `"surprise"`, `"fear"`, `"happy"`, `"disgust"`, `"neutral"`.

    - **emotion** (`dict`):
      Confidence scores for each emotion category:
      - `sad`, `angry`, `surprise`, `fear`, `happy`, `disgust`, `neutral`.

    - **dominant_race** (`str`):
      The dominant race in the detected face. Possible values include:
      `"indian"`, `"asian"`, `"latino hispanic"`, `"black"`, `"middle eastern"`, `"white"`.

    - **race** (`dict`):
      Confidence scores for each race category:
      - `indian`, `asian`, `latino hispanic`, `black`, `middle eastern`, `white`.

    ### Example Response:
    ```json
    [
      {
        "region": {"x": 50, "y": 80, "w": 120, "h": 120},
        "age": 28.5,
        "face_confidence": 0.97,
        "dominant_gender": "Man",
        "gender": {"Man": 0.92, "Woman": 0.08},
        "dominant_emotion": "happy",
        "emotion": {
          "sad": 0.02,
          "angry": 0.01,
          "surprise": 0.05,
          "fear": 0.01,
          "happy": 0.88,
          "disgust": 0.01,
          "neutral": 0.02
        },
        "dominant_race": "asian",
        "race": {
          "indian": 0.04,
          "asian": 0.89,
          "latino hispanic": 0.03,
          "black": 0.01,
          "middle eastern": 0.02,
          "white": 0.01
        }
      }
    ]"""
    image = await img.read()
    img_to_save = Image(user_id=int(get_current_user(token, security_settings).sub),
                        image=b64encode(image).decode('utf8'))
    db.add(img_to_save)
    await db.commit()
    await db.refresh(img_to_save)

    logger.info('Started analyzing')
    try:
        result = AnalyzeResult(result=[(AnalyzeProcessedFace(**i)) for i in
                                       DeepFace.analyze(array(open(BytesIO(image))), actions,
                                                        anti_spoofing=anti_spoofing)])
    except Exception as e:
        logger.warn(f'Could not analyze image {e}')
        return []

    result_to_save = AIResult(image_id=img_to_save.id, metric_name='analyze', metric_value=result.model_dump_json(),
                              analyzed_at=datetime.now(UTC))
    db.add(result_to_save)
    await db.commit()
    await db.refresh(result_to_save)

    return result.result


@router.post('/extract_faces')
async def extract_faces(token: str, db: db_d, img: UploadFile = File(...),
                        anti_spoofing: bool = False) -> ExtractFacesResponse:
    """Extract faces from a given image.

    ### Request Parameters:
    - **img** (`str` | `np.ndarray`):
      - The input image. Supported formats:
        - A string representing the file path of the image.
        - A NumPy array (BGR format).
        - A Base64-encoded image string.

    - **anti_spoofing** (`boolean`, optional):
      - A flag to enable anti-spoofing checks. Defaults to `False`.

    ### Response:
    A list of dictionaries, each representing a detected face with the following keys:

    - **face** (`np.ndarray`):
      The detected face as a NumPy array.

    - **facial_area** (`dict`):
      The bounding box and feature points of the detected face:
      - `x`, `y`, `w`, `h` (`int`): The coordinates and size of the bounding box.
      - `left_eye`, `right_eye` (`tuple` of `int`): Coordinates of the left and right eyes relative to the person, not the observer.

    - **confidence** (`float`):
      The confidence score associated with the detected face.

    - **is_real** (`boolean`, optional):
      The result of anti-spoofing analysis. This key is included only if `anti_spoofing` is set to `True`.

    - **antispoof_score** (`float`, optional):
      The score from the anti-spoofing analysis. This key is included only if `anti_spoofing` is set to `True`.

    ### Example Response:
    ```json
    [
      {
        "facial_area": {
          "x": 100,
          "y": 50,
          "w": 150,
          "h": 150,
          "left_eye": [120, 80],
          "right_eye": [160, 80]
        },
        "confidence": 0.98,
        "is_real": true,
        "antispoof_score": 0.95
      },
      {
        "facial_area": {
          "x": 300,
          "y": 200,
          "w": 140,
          "h": 140,
          "left_eye": [320, 230],
          "right_eye": [360, 230]
        },
        "confidence": 0.91
      }
    ]"""
    image = await img.read()
    img_to_save = Image(user_id=int(get_current_user(token, security_settings).sub),
                        image=b64encode(image).decode('utf8'))
    db.add(img_to_save)
    await db.commit()
    await db.refresh(img_to_save)

    logger.info('Started extracting faces')
    try:
        t = DeepFace.extract_faces(array(open(BytesIO(image))), anti_spoofing=anti_spoofing)
        for i in t:
            i.pop('face')
        result = ExtractFacesResult(result=t)
    except Exception as e:
        logger.warn(f'Could not extract faces from image {e}')
        return []

    result_to_save = AIResult(image_id=img_to_save.id, metric_name='analyze', metric_value=result.model_dump_json(),
                              analyzed_at=datetime.now(UTC))
    db.add(result_to_save)
    await db.commit()
    await db.refresh(result_to_save)
    return result.result


@router.post('/verify')
async def verify(token: str, db: db_d, img1: UploadFile = File(...), img2: UploadFile = File(...),
                 anti_spoofing: bool = False) -> VerifyResponse | None:
    """Verify if two images represent the same person or different persons.

    ### Request Parameters:
    - **img1** (`str` | `np.ndarray` | `List[float]`):
      - The first image input. Supported formats:
        - A string representing the file path of the image.
        - A NumPy array (BGR format).
        - A Base64-encoded image string.
        - Pre-calculated embeddings as a list of floats.

    - **img2** (`str` | `np.ndarray` | `List[float]`):
      - The second image input. Supported formats:
        - A string representing the file path of the image.
        - A NumPy array (BGR format).
        - A Base64-encoded image string.
        - Pre-calculated embeddings as a list of floats.

    - **anti_spoofing** (`boolean`, optional):
      - A flag to enable anti-spoofing checks. Defaults to `False`.

    ### Response:
    A dictionary containing the following keys:

    - **verified** (`bool`):
      Indicates whether the images represent the same person (`True`) or different persons (`False`).

    - **distance** (`float`):
      The calculated distance between the face vectors. Lower distances indicate higher similarity.

    - **threshold** (`float`):
      The maximum threshold value for verification. If the distance is below this value, the images are considered a match.

    - **model** (`str`):
      The name of the face recognition model used for verification.

    - **distance_metric** (`str`):
      The similarity metric used to calculate the distance.

    - **facial_areas** (`dict`):
      Detected face regions in both images:
      - `img1`: {`x`: `int`, `y`: `int`, `w`: `int`, `h`: `int`}
        Region of interest for the first image.
      - `img2`: {`x`: `int`, `y`: `int`, `w`: `int`, `h`: `int`}
        Region of interest for the second image.

    - **time** (`float`):
      The time taken for the verification process in seconds.

    ### Example Response:
    ```json
    {
      "verified": true,
      "distance": 0.45,
      "threshold": 0.6,
      "model": "ResNet50",
      "distance_metric": "cosine",
      "facial_areas": {
        "img1": {"x": 50, "y": 100, "w": 150, "h": 150},
        "img2": {"x": 45, "y": 95, "w": 145, "h": 145}
      },
      "time": 0.025
    }"""
    image1 = await img1.read()
    img_to_save = Image(user_id=int(get_current_user(token, security_settings).sub),
                        image=b64encode(image1).decode('utf8'))
    db.add(img_to_save)
    await db.commit()
    await db.refresh(img_to_save)

    image2 = await img2.read()
    img_to_save = Image(user_id=int(get_current_user(token, security_settings).sub),
                        image=b64encode(image2).decode('utf8'))
    db.add(img_to_save)
    await db.commit()
    await db.refresh(img_to_save)

    logger.info('Started verifying')
    try:
        result = VerifyResponse(**DeepFace.verify(array(open(BytesIO(image1))),
                                                  array(open(BytesIO(image2))), anti_spoofing=anti_spoofing))
    except Exception as e:
        logger.warn(f'Could not verify images {e}')
        return None

    result_to_save = AIResult(image_id=img_to_save.id, metric_name='analyze', metric_value=result.model_dump_json(),
                              analyzed_at=datetime.now(UTC))
    db.add(result_to_save)
    await db.commit()
    await db.refresh(result_to_save)

    return result
