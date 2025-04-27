# Event Listening Platform

A full-stack event management platform built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- Modern React-based user interface
- Responsive design
- Event browsing and search
- User authentication
- Event creation and management
- Event registration system

### Backend
- RESTful API
- User authentication and authorization
- Event CRUD operations
- Event registration system
- Search and filter events
- Category-based event organization

## Project Structure

```
event-listening-platform/
├── frontend/          # React frontend application
└── backend/           # Node.js backend server
```

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

### Public Routes
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event

### Protected Routes
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register for an event

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Bootstrap
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Async Handler

## License

MIT
