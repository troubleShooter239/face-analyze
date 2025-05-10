from starlette import status

from src.dependencies import db_d, is_admin_d
from src.models import Image
from src.routers import create_router
from src.schemas.images import AddImg

router = create_router('/images', [is_admin_d], 'id', Image, Image.id, int)


@router.post('', status_code=status.HTTP_201_CREATED)
async def add_img(r: AddImg, db: db_d) -> None:
    new_img = Image(user_id=r.user_id, image=r.image)
    db.add(new_img)
    await db.commit()
    await db.refresh(new_img)
