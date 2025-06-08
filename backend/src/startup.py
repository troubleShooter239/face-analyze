from base64 import b64encode
from datetime import UTC, datetime
from io import BytesIO
from pathlib import Path

from PIL.Image import open
from deepface import DeepFace
from numpy import array

from src.schemas.ai import AnalyzeProcessedFace, AnalyzeResult
from src.services.security import pwd_context
from src.database import Base, async_maker, engine
from src.models import AIResult, Admin, AdminLog, Image, Log, User
from src.utils.logger import logger

async def drop_and_create():
    async with engine.begin() as conn:
        logger.debug("Dropping all tables")
        await conn.run_sync(Base.metadata.drop_all)
        logger.debug("Creating database tables")
        await conn.run_sync(Base.metadata.create_all)


async def insert_test_data():
    async with async_maker() as session:
        # Создание администратора
        admin = Admin(email="admin@face-analyze.com", password=pwd_context.hash("admin"), name="Oleg")
        session.add(admin)

        # Создание пользователя
        user = User(
            email="user@example.com",
            password=pwd_context.hash("user"),
            created_at=datetime.now(UTC),
            updated_at=datetime.now(UTC)
        )
        session.add(user)

        await session.flush()  # получим ID до использования их ниже

        # Создание изображения
        img_path = Path("test_data/patrick.jpg")
        if not img_path.exists():
            img_path.write_bytes(b"FakeImageData")
        
        img_bytes = img_path.read_bytes()
        image = Image(user_id=user.id, image=b64encode(img_bytes).decode('utf-8'))
        session.add(image)
        await session.flush()

        try:
            result = AnalyzeResult(result=[(AnalyzeProcessedFace(**i)) for i in 
                                           DeepFace.analyze(array(open(BytesIO(img_bytes))))])
        except Exception as e:
            logger.warn(f'Could not analyze image {e}')
            result = None

        # AI результат
        ai_result = AIResult(
            image_id=image.id, 
            metric_name='analyze', 
            metric_value=result.model_dump_json(indent=2) if result else '{ "error": "trouble in analyze" }',
            analyzed_at=datetime.now(UTC)
        )
        session.add(ai_result)

        # Лог пользователя
        log = Log(
            user_id=user.id,
            time=datetime.now(UTC),
            action="Uploaded image"
        )
        session.add(log)

        # Лог администратора
        admin_log = AdminLog(
            admin_id=admin.id,
            time=datetime.now(UTC),
            action="Viewed user logs"
        )
        session.add(admin_log)

        await session.commit()