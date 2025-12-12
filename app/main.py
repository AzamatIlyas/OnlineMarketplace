from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router.auth import router as auth_router
from app.api.router.user import router as user_router
from app.api.router.ad_router.ad import router as ad_router
from app.api.router.ad_router.ad_favourites_likes import router as ad_favourites_likes_router
from app.api.router.category import router as category_router
from app.api.router.favourite import router as favourite_router
from app.api.router.ad_likes import router as ad_likes_router
from app.api.router.chat import router as chat_router
from app.api.router.report import router as report_router
from app.api.router.user_history import router as user_history_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://172.20.10.2:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(category_router)
app.include_router(ad_router)
app.include_router(ad_favourites_likes_router)
app.include_router(favourite_router)
app.include_router(ad_likes_router)
app.include_router(chat_router)
app.include_router(report_router)
app.include_router(user_history_router)