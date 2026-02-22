# Imagen base estable
FROM python:3.11-slim

# Variables de entorno para optimizar Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalamos dependencias de sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiamos el requirements que ahora está tanto en raíz como en backend
# para asegurar que Docker siempre lo encuentre
COPY backend/requirements.txt ./requirements.txt

# Instalamos dependencias (forzando binarios para evitar compilación de Rust)
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el código del backend específicamente
COPY backend/app ./app

# Exponemos el puerto
EXPOSE 8000

# Comando de ejecución
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}