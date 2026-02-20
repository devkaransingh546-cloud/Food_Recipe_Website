# Food Recipe Website (Full-Stack)

Deployment-ready full-stack recipe application with:
- Node.js + Express REST API
- MongoDB (users, recipes)
- JWT authentication
- Recipe CRUD + favorites
- Ingredient/category/time filters
- React frontend with responsive UI and dark mode

## Tech Stack
- Frontend: React, React Router, Axios, Vite
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure
```txt
Food_Recipe_Website/
  backend/
  frontend/
  docker-compose.yml
```

## Setup
### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
npm run seed
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.
