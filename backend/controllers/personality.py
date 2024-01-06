from fastapi import APIRouter, Request
import jwt
from ..services import TextToPersonality
from ..config import JTW_SECRET


router = APIRouter(prefix="/personality")

@router.post("/")
async def get_personality(req: Request):
    text = await req.json()
    text = text["text"]
    personality = TextToPersonality.predict(text)
    token = jwt.encode({
        'text': text,
        'personality': personality
    }, JTW_SECRET, algorithm='HS256')
    return {
        'personality': personality,
        'token': token
    }

@router.post("/rating")
async def rating(req: Request):
    newrating = await req.json()
    print(newrating)
    token = newrating["token"]
    token = jwt.decode(token, JTW_SECRET, algorithms=['HS256'])
    personality = token["personality"]
    text = token["text"]
    TextToPersonality.add_rating(text, personality)
    return {
        'success': True
    }


