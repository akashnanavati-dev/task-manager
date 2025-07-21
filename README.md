# Task Manager API

Full-stack MERN application for task management with user authentication.

## Features
- User registration and login with JWT authentication
- Create, read, update, delete tasks
- Task prioritization (low, medium, high)
- Task status tracking (pending, in-progress, completed)

## API Endpoints
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/tasks - Get user's tasks
- POST /api/tasks - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Tech Stack
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Create .env file with MONGODB_URI and JWT_SECRET
4. Run: `npm run dev`