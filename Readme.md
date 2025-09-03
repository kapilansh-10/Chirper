# Chirper

A minimal Twitter-like microblogging app where users can register, log in, and post short "chirps" (text up to 280 chars) with optional image uploads. Users can like, edit, and delete their own chirps, and view a profile feed. Built with React + Vite on the client and Express + MongoDB + Cloudinary on the server.

## Tech stack

- Frontend: React 19, Vite, Tailwind CSS 4, React Router
- Backend: Express 5, Mongoose 8, JWT auth, Multer, Cloudinary
- Database: MongoDB (Atlas or local)

## Monorepo structure

- `client/` — React + Vite app (UI, auth, feed, profile)
- `server/` — Express API (auth, chirps CRUD, likes, image upload)

## Features

- Email/password registration and login (JWT, 1h expiry)
- Create chirps (text up to 280 chars) with optional image uploads (Cloudinary)
- View global feed (newest first)
- Like/unlike chirps
- Edit/delete your own chirps
- View a user profile feed

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (e.g., MongoDB Atlas)
- A Cloudinary account (cloud name, API key, API secret)

## Quick start (local)

1) Server setup
- Copy environment template and fill values:
	- See `server/.env.example`
- Install deps and run:
	- In `server/`: `npm install`
	- Start dev server: `npm run dev` (nodemon) → http://localhost:5000

2) Client setup
- Install deps and run:
	- In `client/`: `npm install`
	- Start dev server: `npm run dev` → typically http://localhost:5173

Important for local API calls
- The client currently points to a deployed API: `https://chirper-api-kapilansh.onrender.com`
- For local development, update the hardcoded base URL(s) to `http://localhost:5000` in these files:
	- `client/src/App.jsx`
	- `client/components/HomePage.jsx`
	- `client/components/ProfilePage.jsx`
	- `client/components/LoginPage.jsx`
	- `client/components/RegisterPage.jsx`
- Tip (optional improvement): centralize the API base using an env var (e.g., `VITE_API_URL`) and import it where `fetch` is used.

## Environment variables (server)

Create `server/.env` with:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — strong random secret for signing JWTs
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `PORT` — optional, default is 5000 (server currently uses 5000 in code)

## Scripts

Server (`server/package.json`)
- `npm run dev` — start API with nodemon
- `npm start` — start API with node

Client (`client/package.json`)
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## API overview

Base URL
- Local: `http://localhost:5000`
- Deployed: `https://chirper-api-kapilansh.onrender.com`

Auth
- Register: `POST /api/auth/register`
	- Body (JSON): `{ username, email, password }`
	- 201 Created → `{ message }`
- Login: `POST /api/auth/login`
	- Body (JSON): `{ email, password }`
	- 200 OK → `{ message, token, user: { id, username, email } }`
	- Use `Authorization: Bearer <token>` for protected routes

Chirps
- Create: `POST /api/chirps` (auth)
	- multipart/form-data: `text` (required), `image` (file, optional)
	- Returns the created chirp populated with `author.username`
- List all: `GET /api/chirps` (auth)
	- Returns all chirps sorted by `createdAt` desc
- Get by user: `GET /api/chirps/user/:userId`
	- Returns chirps by a user (server route is public)
- Edit: `PATCH /api/chirps/:id` (auth, owner only)
	- Body (JSON): `{ text }`
- Delete: `DELETE /api/chirps/:id` (auth, owner only)
- Like/unlike: `PATCH /api/chirps/:id/likes` (auth)

Auth details
- JWT payload shape: `{ user: { id, username }, iat, exp }`
- Token is stored in `localStorage` by the client and decoded on load

## UI flow

- Unauthenticated users see Login/Register
- After login, see the Home feed with a composer to chirp (and attach an image)
- Like/unlike any chirp, edit/delete only your own
- Click a username to view their Profile page (their chirps)

## Deployment notes

- Set all server environment variables on your hosting provider (e.g., Render, Railway, Fly.io)
- Ensure the Cloudinary credentials and MongoDB URI are configured
- The server enables CORS for all origins by default; restrict as needed in production
- Update the client API base URL(s) to your deployed server

## Troubleshooting

- JWT expired (1h): log in again; consider refreshing tokens if needed
- 401 “No token”: ensure `Authorization: Bearer <token>` header is set on protected calls
- MongoDB connection errors: verify `MONGO_URI` and network access (Atlas IP allowlist)
- Image upload issues: confirm Cloudinary credentials and allowed formats (jpg, png, jpeg)

## License

No license file is provided in the repository. The `server` subpackage lists ISC in its package.json. Add a top-level LICENSE if you intend to open-source the project.
