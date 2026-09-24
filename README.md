# TechBridge Task Management API

## Task 7 — Web Development Internship

This project extends the TechBridge Intern Dashboard by connecting the frontend to a Node.js and Express backend API.

Instead of storing internship task information directly inside the frontend JavaScript, the dashboard now requests task data from the backend using the Fetch API.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* JSON
* REST API
* Fetch API

## How It Works

The project follows this flow:

Frontend Dashboard
↓
JavaScript Fetch Request
↓
Express REST API
↓
Task Data (`tasks.json`)
↓
JSON Response
↓
Dashboard

## API Endpoints

| Method | Endpoint         | Purpose                                       |
| ------ | ---------------- | --------------------------------------------- |
| GET    | `/api/health`    | Check whether the backend server is available |
| GET    | `/api/tasks`     | Retrieve all internship tasks                 |
| GET    | `/api/tasks/:id` | Retrieve one task using its ID                |
| PUT    | `/api/tasks/:id` | Update the status of an existing task         |

### GET `/api/tasks`

Returns all TechBridge internship tasks.

Example:

```text
GET http://localhost:3000/api/tasks
```

### GET `/api/tasks/:id`

Returns one task based on its ID.

Example:

```text
GET http://localhost:3000/api/tasks/7
```

### PUT `/api/tasks/:id`

Updates the status of a task.

Example request:

```json
{
  "status": "completed"
}
```

Supported statuses:

* `completed`
* `in-progress`
* `not-started`

### GET `/api/health`

Checks whether the TechBridge backend API is running.

Example response:

```json
{
  "status": "connected",
  "message": "TechBridge API is running"
}
```

## Features

* Dynamically loads internship tasks from the backend
* Displays loading states while waiting for API responses
* Displays an error state when the backend is unavailable
* Shows backend connection status
* Filters tasks by status
* Searches through internship tasks
* Retrieves individual task information from the API
* Displays task information without refreshing the page
* Updates task status through the API
* Saves updated status to `tasks.json`
* Automatically recalculates internship progress
* Supports Completed, In Progress and Not Started statuses
* Responsive dashboard interface
* Light and dark themes

## Running the Project

Navigate to the backend folder:

```bash
cd backend
```

Start the Node.js server:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

The frontend can then be opened using VS Code Live Server.

## What I Learned

This task introduced the connection between frontend and backend development.

I learned how to create API endpoints with Node.js and Express, return JSON responses, request data using `fetch()`, update information using HTTP methods, handle loading and error states, and keep the frontend synchronized with backend data.

The project helped me understand the complete flow of:

**Frontend → API → Backend → Data → Response → Frontend**
