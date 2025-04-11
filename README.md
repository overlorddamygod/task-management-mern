# Task Manager

Frontend deployed at [https://task-manager-mern-22.vercel.app](https://task-manager-mern-22.vercel.app)

Backend deployed at [https://task-management-mern-09ef.onrender.com/api](https://task-management-mern-09ef.onrender.com/api)

## Tech Stack

### Backend

- Node.js (JavaScript Runtime)
- Express.js (Web Framework)
- Prisma (ORM)
- PostgreSQL (SQL Database)
- Joi (Validation)
- bcrypt (Password Hashing)
- jsonwebtoken (Authentication)
- Dotenv (Environment Variables)

### Frontend

- React.js (JavaScript Library)
- React Router (Routing)
- Tailwind CSS (CSS Framework)
- Shadcn UI (UI Components)

## Features

- User Registration and Authentication
- CRUD Operations for Tasks

## Setup

Clone the repo:

```
git clone https://github.com/overlorddamygod/task-management-mern.git
cd task-management-mern
```

#### Setup Backend:

```
cd backend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
PORT=3000
JWT_SECRET=aa6f745e8792fae59502bbdbdcba999f0d
DATABASE_URL=postgresql_connection_string
```

or copy from [.env.sample](./backend/.env.sample):

```
cp .env.sample .env
```

Run server:

```
npm start # Production
npm run dev # Development
```

Server runs on [http://localhost:3000](http://localhost:3000)

#### Setup Frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:3000/api
```

or copy from [.env.sample](./frontend/.env.sample):

```
cp .env.sample .env
```

Run server:

```
npm run build && npm run preview // Production
npm run dev // Development
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

## API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/tasks     | Create Task   |
| GET    | /api/tasks     | Get All Tasks |
| PATCH  | /api/tasks/:id | Update Task   |
| DELETE | /api/tasks/:id | Delete Task   |
