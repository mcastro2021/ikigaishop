from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import os

app = FastAPI(title="Ikigai API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    name: str
    anime: str
    price: int
    image_url: str
    stock: int

fake_db = [
    {
        "id": 1,
        "name": "Satoru Gojo - Hollow Purple",
        "anime": "Jujutsu Kaisen",
        "price": 85000,
        "image_url": "https://i.pinimg.com/736x/32/5a/6a/325a6a090680951a3788753238692634.jpg",
        "stock": 5
    },
    {
        "id": 2,
        "name": "Monkey D. Luffy - Gear 5",
        "anime": "One Piece",
        "price": 92000,
        "image_url": "https://m.media-amazon.com/images/I/61F2Kx+vLWL._AC_SL1500_.jpg",
        "stock": 2
    },
    {
        "id": 3,
        "name": "Denji & Pochita",
        "anime": "Chainsaw Man",
        "price": 60000,
        "image_url": "https://m.media-amazon.com/images/I/61eY27s+1OL._AC_UF894,1000_QL80_.jpg",
        "stock": 10
    },
    {
        "id": 4,
        "name": "Son Goku - Kaio-ken",
        "anime": "Dragon Ball Z",
        "price": 75000,
        "image_url": "placeholder",
        "stock": 10
    },
    {
        "id": 5,
        "name": "Naruto Uzumaki - Rasengan",
        "anime": "Naruto Shippuden",
        "price": 70000,
        "image_url": "placeholder",
        "stock": 8
    },
    {
        "id": 6,
        "name": "Eren Yeager - Attack Titan",
        "anime": "Attack on Titan",
        "price": 88000,
        "image_url": "placeholder",
        "stock": 4
    },
    {
        "id": 7,
        "name": "Tanjiro Kamado - Hinokami Kagura",
        "anime": "Demon Slayer",
        "price": 82000,
        "image_url": "placeholder",
        "stock": 6
    }
]

# API Endpoints
@app.get("/api/products", response_model=List[Product])
def get_products():
    return fake_db

@app.get("/api/health")
def health():
    return {"status": "online"}

# SERVIR EL FRONTEND (Debe ir al final)
# Verificamos si existe la carpeta 'out' (donde Next.js exporta la web)
frontend_path = "frontend/out"
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
else:
    @app.get("/")
    def read_root():
        return {"message": "API activa, pero no se encontró el frontend. Verifica el build."}
