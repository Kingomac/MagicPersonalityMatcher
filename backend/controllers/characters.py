from fastapi import APIRouter

from db.models import Character
from db.util import personality_to_text
from ..database import create_session
from sqlalchemy import select, func


router = APIRouter(prefix="/characters")

@router.get("/any")
async def get_any(limit: str = 9, include_serie_name: bool = False):
    with create_session() as session:
        with session.begin():
            stmt = select(Character).order_by(func.random()).limit(limit)
            if include_serie_name:
                return [{ 'id': x.id, 'name': x.name, 'image': x.image, 'personality': personality_to_text(x), 'serie_name': x.serie.name } for x in session.scalars(stmt)]
            return [{ 'id': x.id, 'name': x.name, 'image': x.image, 'personality': personality_to_text(x) } for x in session.scalars(stmt)]
        