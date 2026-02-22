from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ikigai API", version="1.0.0")

# Configuración CORS (Vital para que Next.js hable con Python)
# En producción, cambiá "*" por tu dominio real de Vercel/Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Ikigai API funcionando: Sistema listo para ventas 🚀"}

@app.get("/api/status")
def status():
    return {"status": "active", "environment": "production-ready"}