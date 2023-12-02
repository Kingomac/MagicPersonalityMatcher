from fastapi import APIRouter, Request
from ..services import TextToPersonality


router = APIRouter(prefix="/personality")

@router.post("/")
async def get_personality(req: Request):
    text = await req.json()
    text = text["text"]
    return {
        'personality': TextToPersonality.predict(text)
    }

