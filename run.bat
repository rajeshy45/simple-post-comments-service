@echo off

docker-compose -f server/docker-compose.yml up --build -d

cd /d "./client"

npm install && npm run dev &
