from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from .controllers import series,personality,characters
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost"
]

router = APIRouter(prefix="/api")


@app.get("/")
async def main():
    return {"message": "Hello World"}


router.include_router(personality.router)
router.include_router(series.router)
router.include_router(characters.router)
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/static", StaticFiles(directory="backend/static"), name="static")