# Evangadi Forum

A full-stack Q&A web platform where users can post questions and answers, built with a React frontend and a Node.js/Express REST API backed by MySQL.

## Project Structure

```
evangadi-forum/
  client/    React frontend (Vite)
  server/    Node.js/Express REST API
```

## Features

- User registration and login with JWT authentication
- Post and browse questions with threaded answers
- Protected routes for authenticated users
- Responsive UI with Material-UI components
- Real-time form validation and error handling
- How It Works and About pages

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Axios
- Material-UI
- Bootstrap
- SweetAlert2

**Backend**
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- bcrypt
- CORS / dotenv

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL database

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Fill in your database credentials and JWT secret
node app.js
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env
# Set VITE_API_BASE_URL to your backend URL
npm run dev
```

## Deployment

- Frontend → [Netlify](https://evangadiforump.netlify.app) — set `VITE_API_BASE_URL` in environment variables
- Backend → Render — set all DB and JWT env vars in Render dashboard

## Live Demo

[https://evangadiforump.netlify.app](https://evangadiforump.netlify.app)
