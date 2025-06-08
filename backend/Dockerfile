FROM python:3.12.8-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./src /app/src
COPY ./requirements /app/requirements

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /app/requirements/prod.txt

CMD ["uvicorn", "src.main:app", "--worker-class", "uvloop"]
