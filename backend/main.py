from fastapi import FastAPI, APIRouter
from .controllers import series

app = FastAPI()
router = APIRouter(prefix="/api")


@app.get("/")
async def main():
    return {"message": "Hello World"}


router.include_router(series.router)
app.include_router(router)