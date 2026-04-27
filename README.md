# Evangadi Forum

A full-stack Q&A web application where users can ask questions, post answers, and browse community knowledge — built from scratch with a React frontend and an Express/Node.js backend.

**Live Demo:** [evangadiforump.netlify.app](https://evangadiforump.netlify.app) &nbsp;·&nbsp; **API:** [kewani-evangadi-forum.onrender.com](https://kewani-evangadi-forum.onrender.com)

---

## Features

- **User authentication** — register, log in, and stay signed in with JWT tokens
- **Ask & answer** — post questions with titles and descriptions; browse and submit answers
- **Protected routes** — unauthenticated users are redirected before accessing the forum
- **Firestore backend** — questions and answers stored in Google Firestore
- **Responsive UI** — works across mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | Google Firestore |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

## Project Structure

```
kewani-evangadi-forum/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level pages (Home, Question, Auth)
│       └── utility/      # Axios instance config
└── server/               # Express backend
    ├── app.js            # Entry point, routes, middleware
    └── render.yaml       # Render deployment config
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/kewanim/kewani-evangadi-forum.git
cd kewani-evangadi-forum

# Start the backend
cd server
npm install
cp .env.example .env   # Fill in Firebase credentials and JWT_SECRET
node app.js

# Start the frontend (new terminal)
cd ../client
npm install
npm run dev
```

## Environment Variables

**Server** (`.env`):
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
JWT_SECRET=
```

## Deployment

- **Frontend** auto-deploys to Netlify on every push to `main`
- **Backend** auto-deploys to Render on every push to `main`

---

Built by [Kewani Mulugeta](https://kewaniportfolio.netlify.app)
