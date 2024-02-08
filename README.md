# simple-post-comments-service

A simple post-comments service web app with Next.js frontend and Node.js backend.

# How to run

### Dependencies (must have these before running the application):
- Node.js
- Docker
- Postman

## To run both client and server together

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

# Requirements

## Core Functionality

- Users can create posts with title, image and description.
- Users can comment on a post any number of times.
- Each post can have multiple comments.

## Comment Features

- Comments are text-based.
- Rich text is also supported for comments and description of the post. Any markup text (markdown, html, etc.) can be stored in the database. Rendering of this text has to be handled by the frontend.

## Language/Framework

I have used Express.js to write APIs because:
- It is fast and lightweight, with a low learning curve and minimal boilerplate code.
- It has a rich ecosystem of third-party modules and plugins that extend its functionality and compatibility with other technologies.
- It follows the MVC (Model-View-Controller) pattern, which helps to organize the code and separate the concerns of different components.

## Data Storage

The data produced by this application is structured and relational. Hence, an ideal database would be a relational database. I used MySQL because it is reliable, fast, easy to use and has rich community support.

## API Design

All the APIs are designed by following REST priciples.

## Documentation

- Documentation for each API is provided in the postman collection.
- Instructions on how to run the applications and dependencies are explained above.

## Code Quality

- Industry standard coding practices are followed.
- I have followed MVC (Model-View-Controller) architecture because:
  - It improves the modularity and maintainability of the code, as each component has a clear responsibility and can be changed independently.
  - It enhances the testability and reusability of the code, as each component can be tested and reused in different contexts.
