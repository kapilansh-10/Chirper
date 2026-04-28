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
# Chirper

A full-stack Twitter-like social media app for creating posts, liking, uploading media, and following users.

## Features
- RESTful APIs for posts, likes, and media uploads
- Server-side validation and robust error handling
- JWT authentication with protected routes
- Create and edit post flows
- User registration, login, and profile management

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Media Storage:** Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for media uploads)

### Clone the repository
```
git clone https://github.com/your-username/chirper.git
cd chirper
```

### Install dependencies
#### Client
```
cd client
npm install
```
#### Server
```
cd ../server
npm install
```

### Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Application
#### Start the server
```
cd server
npm start
```
#### Start the client
```
cd ../client
npm run dev
```

## Screenshots
[Screenshot here]

## Live Demo
[Live demo link here]

---
For any questions or contributions, please open an issue or submit a pull request.
	- multipart/form-data: `text` (required), `image` (file, optional)
