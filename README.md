# iNOTES

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A full-stack notes app built to keep things simple: sign in, capture ideas, tag them, edit fast, and keep moving.

iNOTES is how to keep note-taking fast and clear:
- JWT auth for private data
- Notes CRUD with ownership checks
- Clean, responsive UI with smooth motion
- Toast alerts for instant feedback

## What I Built

- You can create an account and log in securely
- You can add notes with title, description, and tag
- You can edit and delete only your own notes
- You can view all notes in one place
- You can use the same flow on desktop and mobile

## Tech Stack

- Frontend: React, React Router, Framer Motion, React Toastify
- Backend: Node.js, Express, JWT, bcryptjs, express-validator
- Database: MongoDB + Mongoose
- Tooling: npm workspaces, concurrently, nodemon

## Project Structure

```text
iNOTES/
  client/   # React app
  server/   # Express API
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local instance or MongoDB Atlas URI)

## Setup

1. install dependencies from the project root:

```bash
npm install
```

2. create these environment files:

- `server/.env`
- `client/.env`

3. dd these variables:

### server/.env

```env
MONGO_URI=mongodb://localhost:27017/iNotes
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
CLIENT_URL=http://localhost:3000
```

### client/.env

```env
REACT_APP_API_URL=http://localhost:5000
```

## How To Start

### Option 1: One command (recommended)

I added a custom script for this:

```bash
npm run arise
```

When run it, it starts:
- server in dev mode (nodemon)
- client in dev mode (react-scripts start)

### Option 2: Start from root in separate terminals

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run client
```

### Option 3: Start inside each folder

Server terminal:

```bash
cd server
npm install
npm run dev
```

Client terminal:

```bash
cd client
npm install
npm start
```

## Production Start

From root, run:

```bash
npm run start:prod
```

Or run each workspace directly:

```bash
npm start --workspace=server
npm start --workspace=client
```

## API Endpoints

Base URL use locally: `http://localhost:5000`

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/createuser | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |
| POST | /api/auth/getuser | Get logged-in user details |

### Notes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/notes/fetchnotes | Fetch all notes for current user |
| POST | /api/notes/addnote | Create a note |
| PUT | /api/notes/updatenote/:id | Update a note by id |
| DELETE | /api/notes/deletenote/:id | Delete a note by id |

## Deployment Notes

- backend expects these env vars in production: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- set `REACT_APP_API_URL` on the frontend to the deployed backend URL
- Health checks:
  - `GET /`
  - `GET /api/health`

## Troubleshooting

- `JWT_SECRET` missing:
  - Login/signup can fail with server configuration errors
  - fix it by setting `JWT_SECRET` in `server/.env`

- `REACT_APP_API_URL` missing or wrong:
  - Frontend requests fail or hit undefined host
  - fix it by setting the correct backend URL in `client/.env`

- Mongo connection fails:
  - check `MONGO_URI`
  - verify MongoDB service is running (local) or Atlas network access is allowed

## Why iNOTES

I built this because good notes apps should get out of the way.

iNOTES keeps my workflow tight: authenticate once, write quickly, organize with tags, and manage everything from one clean interface.