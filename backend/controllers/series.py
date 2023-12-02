from sqlalchemy import select
from ..database import create_session
from db.models import Serie
from fastapi import APIRouter
from ..services import get_some_posts

router = APIRouter(prefix="/series")


@router.get("/")
async def get_series():
    with create_session() as session:
        with session.begin():
            stmt = select(Serie).order_by(Serie.name)
            return [x.__dict__ for x in session.scalars(stmt)]
        