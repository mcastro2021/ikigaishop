from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Ikigai API", version="1.0.0")

# Configuración CORS (Igual que antes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Definimos el "Modelo" de una Figura (Qué datos tiene)
class Product(BaseModel):
    id: int
    name: str
    anime: str
    price: int
    image_url: str
    stock: int

# 2. Nuestra "Base de Datos" Falsa (Por ahora)
fake_db = [
    {
        "id": 1,
        "name": "Satoru Gojo - Hollow Purple",
        "anime": "Jujutsu Kaisen",
        "price": 85000,
        "image_url": "https://i.pinimg.com/736x/32/5a/6a/325a6a090680951a3788753238692634.jpg", # Placeholder
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
        "name": "EVA-01 Test Type",
        "anime": "Evangelion",
        "price": 120000,
        "image_url": "https://m.media-amazon.com/images/I/61Nl-Xk+1qL._AC_SL1500_.jpg",
        "stock": 1
    }
]

@app.get("/")
def read_root():
    return {"message": "Ikigai API: Sistema de Ventas Activo 🛒"}

# 3. Nuevo Endpoint: Devuelve la lista de productos
@app.get("/api/products", response_model=List[Product])
def get_products():
    return fake_db