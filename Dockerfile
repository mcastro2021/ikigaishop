# ETAPA 1: Construcción del Frontend (Node.js con soporte nativo)
FROM node:20-slim AS frontend-builder
WORKDIR /frontend-build

# Instalamos herramientas básicas de construcción por si acaso
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copiamos solo el package.json para aprovechar la caché
COPY frontend/package*.json ./

# Forzamos una instalación limpia ignorando el lock si hay conflictos
RUN npm install --include=dev

# Copiamos el resto del código del frontend
COPY frontend/ ./

# Construimos la web
RUN npm run build

# ETAPA 2: Servidor Final (Python)
FROM python:3.11-slim
WORKDIR /app

# Instalamos dependencias de sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalamos dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiamos el código del Backend
COPY app ./app

# Copiamos la web construida desde la Etapa 1 al lugar donde Python la servirá
COPY --from=frontend-builder /frontend-build/out ./frontend/out

# Exponemos el puerto
EXPOSE 8000

# Comando de arranque
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]