# simple-post-comments-service
 A simple post-comments service web app with Next.js frontend and Node.js backend.

# How to run
### Note: Docker has to be installed on the local machine to run this application.

## To run both client and server
### Note: Client (frontend) is still in development.
- Rename the ```.env.dist``` file to ```.env``` in both client and server folders.
- In Windows machine, run the file ```run.bat``` in the root folder.
- In Linux or max, run the file ```run.sh``` in the root folder.
- If there is any error while running these files, try running the commands in the file manually.

## Run client and server separately
### Note: Client (frontend) is still in development.
- To start server, go to the server folder and run the file ```run.sh``` or run the command ```docker-compose up --build```.
- To start client, go to the client folder and run the file ```run.sh``` or run the command ```npm install && npm run dev```.

# Tech Stack
- **Frontend:** Next.js (React.js)
- **Backend:** Node.js (Express.js)
- **Database:** MySQL (Sequelize JS)
- **Authentication & Authorization:** JWT
- **Deployement:** Docker
- **Source Control:** Git
- **API Testing & Documentation:** Postman

# API Documentation
All the APIs are tested and documented using Postman tool.

![image](https://github.com/rajeshy45/simple-post-comments-service/assets/73592971/6c70de31-1e06-4f77-a564-6e1cb0ad5d58)

## How to call APIs
- Import the postman collection ```Simple-Post-Comments-Service.postman_collection.json```.
- Import the postman environment ```Simple-Post-Comments-Service.postman_environment.json```.
- First, register a user by calling register API.
- After registering a user, you will receive a ```token``` in the response, which is required to call any other route except ```auth``` routes.
- Use this ```token``` value to set the ```apiKey``` value in the postman environment.
