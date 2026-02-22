# Usamos una imagen de Python estable
FROM python:3.11-slim

# Evitar archivos .pyc y buffers
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo
WORKDIR /app

# Instalamos dependencias mínimas de sistema para evitar compilaciones fallidas
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiamos requirements e instalamos
# Nota: Usamos --only-binary para forzar el uso de ruedas pre-compiladas si es posible
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código
COPY . .

# Comando de arranque usando la variable PORT de Render
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}