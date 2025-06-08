@echo off
echo Running in DEBUG mode...
echo Upping database
docker-compose up -d
echo Starting Uvicorn ASGI server
uvicorn src.main:app
