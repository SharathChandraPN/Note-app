# Simple devops end to end

A very simple MERN Notes application built to demonstrate a complete development and CI/CD workflow.

## Production

**Frontend:**
https://name-simple-notes-frontend.onrender.com

**Backend:**
https://simple-notes-backend-vpgh.onrender.com

**API:**
https://simple-notes-backend-vpgh.onrender.com/api/notes

## Technology Stack

### Frontend

* React
* Vite
* Axios
* ESLint

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

### DevOps

* Git
* GitHub
* GitHub Actions
* Docker
* Docker Compose
* Render

## Project Structure

```text
Note-app/
├── client/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Application Features

The application intentionally has a small feature set:

* View notes
* Add a note
* Delete a note

The purpose of the project is to demonstrate the complete software delivery workflow rather than build a feature-heavy application.

## Run Locally Without Docker

### 1. Clone the repository

```bash
git clone https://github.com/SharathChandraPN/Note-app.git
cd Note-app
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Run With Docker

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose build
```

Then:

```bash
docker compose up
```

The application will be available at:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:5000
```

To stop the containers:

```bash
docker compose down
```

## Environment Variables

### Frontend

`client/.env`

```env
VITE_API_URL=http://localhost:5000
```

For production, Render provides:

```env
VITE_API_URL=https://simple-notes-backend-vpgh.onrender.com
```

### Backend

`server/.env`

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```

Never commit `.env` files containing real secrets.

Use `.env.example` files to document required variables.

## CI Pipeline

The project uses GitHub Actions for Continuous Integration.

Workflow:

```text
git push
    ↓
GitHub Actions
    ↓
Install dependencies
    ↓
Run ESLint
    ↓
Build frontend
    ↓
Install backend dependencies
    ↓
CI passes
```

The workflow is located at:

```text
.github/workflows/ci.yml
```

If the CI pipeline fails, the code should be fixed before deployment.

## CD Pipeline

Render handles Continuous Deployment.

The deployment workflow is:

```text
Developer changes code
        ↓
git push origin master
        ↓
GitHub
        ↓
GitHub Actions CI
        ↓
CI passes
        ↓
Render deployment
        ↓
Docker image/build
        ↓
Production
```

The frontend and backend are deployed as separate Render services.

## Docker

The backend has its own Dockerfile:

```text
server/Dockerfile
```

The frontend has its own Dockerfile:

```text
client/Dockerfile
```

Docker provides a consistent environment for building and running the application.

Docker Compose is used to run the frontend and backend together during local development.

## Database

The application uses MongoDB Atlas.

The backend connects to MongoDB using the `MONGO_URI` environment variable.

The MongoDB connection string must never be committed to GitHub.

## Deployment Maintenance

For normal application changes:

```bash
git add .
git commit -m "Describe the change"
git push origin master
```

After pushing:

1. GitHub Actions runs CI.
2. ESLint and the frontend build are checked.
3. If CI passes, Render deploys the new version.
4. Docker builds the application.
5. The updated application becomes available in production.

No manual Docker image upload is required.

## Basic Troubleshooting

### Frontend cannot reach backend

Check:

```env
VITE_API_URL
```

The production frontend must point to the production backend.

### MongoDB connection failure

Check:

```env
MONGO_URI
```

Also verify that the deployment environment can connect to MongoDB Atlas.

### CI failure

Open:

```text
GitHub → Actions
```

Find the failed step and fix the reported error.

### Deployment failure

Open the relevant Render service and check its deployment logs.

## Important Security Notes

* Never commit `.env` files.
* Never commit database passwords or API secrets.
* Keep production credentials only in Render environment variables.
* Do not expose MongoDB credentials in frontend code.
* Review dependencies periodically.

## Development Workflow

The recommended workflow is:

```text
Create/change code
       ↓
Test locally
       ↓
Run lint/build
       ↓
git commit
       ↓
git push
       ↓
GitHub Actions
       ↓
Render deployment
       ↓
Verify production
```

## Project Goal

This project demonstrates a complete small-scale production workflow:

```text
MERN
 ↓
Git
 ↓
GitHub
 ↓
Docker
 ↓
GitHub Actions
 ↓
CI
 ↓
Render
 ↓
CD
 ↓
Production
```

The application is intentionally simple so the development and deployment workflow remains easy to understand and maintain.
