from fastapi import APIRouter
from ..services import get_posts_examples

router = APIRouter(prefix="/examples")

@router.get("/{n}")
def get_examples(n: int):
    return get_posts_examples(n)