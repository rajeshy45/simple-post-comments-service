#!/bin/bash

# start API
docker-compose -f server/docker-compose.yml up --build -d

# start client
cd "./client"

npm install && npm run dev &
disown