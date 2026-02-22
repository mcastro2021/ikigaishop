# Usamos la imagen oficial más reciente de Python
# Al usar "slim", bajamos el peso, pero necesitamos instalar compiladores manualmente
FROM python:3.12-slim

# Definimos variables de entorno para evitar archivos .pyc y buffers
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# INSTALACIÓN DE DEPENDENCIAS DE SISTEMA (CRÍTICO PARA TU ERROR)
# Instalamos gcc y librerías de Rust para poder compilar pydantic-core
# si no existen binarios para la versión de Python que estás usando.
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalamos Rust y Cargo (necesario para compilar Pydantic en versiones nuevas)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Copiamos primero el requirements para aprovechar la caché de Docker
COPY requirements.txt .

# Instalamos las dependencias de Python
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código del backend
COPY . .

# Exponemos el puerto (Render usa la variable PORT, pero por defecto es 10000 o similar)
EXPOSE 8000

# Comando de arranque
# Usamos la variable de entorno PORT que Render inyecta automáticamente
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]