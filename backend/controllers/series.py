from sqlalchemy import select, func
from ..database import create_session
from db.models import Serie, Character
from fastapi import APIRouter
from db.util import personality_to_text, text_to_personality

router = APIRouter(prefix="/series")

@router.get("/")
async def get_series():
    with create_session() as session:
        with session.begin():
            stmt = select(Serie).order_by(Serie.name)
            return [x.__dict__ for x in session.scalars(stmt)]

@router.get("/any/characters/{personality}")
async def get_any_characters(personality: str):
    personality = personality.upper()
    pbools = text_to_personality(personality)
    with create_session() as session:
        with session.begin():
            stmt = select(Character).where(Character.personality_ie == pbools[0], Character.personality_sn == pbools[1], Character.personality_tf == pbools[2], Character.personality_jp == pbools[3]).order_by(func.random()).limit(6)
            return [{ 'id': x.id, 'image': x.image, 'name': x.name, 'personality':personality_to_text(x), 'serie_name': x.serie.name } for x in session.scalars(stmt)]        

@router.get("/{serie_id}/characters/{personality}")
async def get_characters(serie_id: int, personality: str):
    print("serie_id:",serie_id)
    print("personality:",personality)
    personality = personality.upper()
    pbools = text_to_personality(personality)
    with create_session() as session:
        with session.begin():
            stmt = select(Character).where(Character.serie_id == serie_id, Character.personality_ie == pbools[0], Character.personality_sn == pbools[1], Character.personality_tf == pbools[2], Character.personality_jp == pbools[3]).order_by(Character.name)
            return [{ 'id': x.id, 'image': x.image, 'name': x.name, 'personality':personality_to_text(x) } for x in session.scalars(stmt)]

@router.get("/{serie_id}")
async def get_serie(serie_id: int):
    with create_session() as session:
        with session.begin():
            stmt = select(Serie).where(Serie.id == serie_id)
            res = session.scalar(stmt)
            return { 'id': res.id, 'name': res.name, 'image': res.image }