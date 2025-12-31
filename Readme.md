# Mini User Management System

## Project Overview & Purpose

The **Mini User Management System** is a full-stack web application that manages user accounts with secure authentication and role-based authorization.  
It enables users to register, log in, manage their profiles, and allows admins to control user activation and deactivation.

This project was built as part of the **Backend Developer Intern Assessment** to demonstrate:
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Secure backend API design
- Clean full-stack architecture
- Production deployment

---
## Assessment Brief

The objective of this assessment is to build a **User Management System**, a web application that manages user accounts with different roles and permissions.

The system must support:
- Secure user authentication
- Role-based authorization
- Basic user lifecycle management (activation, deactivation, profile updates)

---

## 🚀 Tech Stack

**Frontend**
* React (Vite)
* React Router
* CSS

**Backend**
* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt

**Testing**
* Jest
* Supertest

**Deployment**
* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## ⚙️ Setup Instructions

### Prerequisites
* Node.js (v18+ recommended)
* npm
* Git
* MongoDB Atlas account

---

## 🔧 Backend Setup

1.  **Navigate to backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file inside `backend/`:**
    ```env
    PORT=
    MONGO_URI=
    JWT_SECRET=
    ACCESS_TOKEN_EXPIRY=
    ```

4.  **Start backend server:**
    ```bash
    npm run dev
    ```
    *Backend runs at:* `http://localhost:PORT`

---

## 🎨 Frontend Setup

1.  **Navigate to frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file inside `frontend/`:**
    ```env
    VITE_API_URL=http://localhost:PORT/api
    ```

4.  **Start frontend:**
    ```bash
    npm run dev
    ```
    *Frontend runs at:* `http://localhost:5173`

---

## Environment Variables

**Backend (`/backend/.env`)**
* `PORT`: Server port (default 7000)
* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key for token signing
* `ACCESS_TOKEN_EXPIRY` : Expiry time

**Frontend (`/frontend/.env`)**
* `VITE_API_URL`: Backend API base URL

> ⚠️ **IMPORTANT:** Do NOT commit `.env` files to version control. They are included in `.gitignore`.

---

## 🚀 Deployment Instructions

### Backend Deployment (Render)
1.  Push code to GitHub.
2.  Create a **Web Service** on Render.
3.  Select repository and set:
    * **Root Directory:** `backend`
    * **Build Command:** `npm install`
    * **Start Command:** `npm start`
4.  Add environment variables in the Render dashboard.
5.  Deploy and copy the generated backend URL.

### Frontend Deployment (Vercel)
1.  Import GitHub repository in Vercel.
2.  Set **Root Directory** to `frontend`.
3.  Add environment variable:
    * `VITE_API_URL`: `https://your-render-app.onrender.com/api`
4.  Deploy and access live URL.

---

## 🧪 Testing

Backend tests are implemented using **Jest** and **Supertest**.

**Run tests:**
```bash
cd backend
npm test
```

## 📘 API Documentation

API documentation is provided via a **Postman Collection** that contains all backend endpoints with example requests, headers, and responses.

🔗 **Postman Collection Link**  
https://www.postman.com/mission-meteorologist-84361860/public/collection/38173124-0238acd4-4969-4a22-ad08-fdf13effe676/?action=share&creator=38173124

### What’s Included ###

**Authentication**
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

**User (Authenticated)**
- PUT /api/users/profile
- PUT /api/users/change-password

**Admin (Admin Only)**
- GET /api/admin/users?page=1
- PUT /api/admin/users/:id/activate
- PUT /api/admin/users/:id/deactivate

**Authorization Notes**
- All protected routes require a JWT token
- Token must be sent in Authorization header as: Bearer <JWT_TOKEN>
- Admin routes are accessible only to users with admin role

To test the APIs:
1. Open the Postman link above
2. Import the collection into Postman
3. Set the `Authorization` header with a valid JWT token where required
4. Hit the deployed backend endpoints

## 📬 Example API Requests & Responses


### 🔐 User Signup

**Endpoint**
-POST /api/auth/signup

**Request**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "64f1abc123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

### 🔑 User Login
**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```
### ✅ Admin – Activate User
**Endpoint:** `PUT /api/admin/users/:id/activate`

**Headers:**
```text
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
```json
{
  "success": true,
  "message": "User activated successfully"
}
```

### CI/CD
CI/CD pipeline implemented using GitHub Actions to automatically run backend tests on every push.

> **NOTE:** Two users (`aman` and `admin`) are used for testing purposes with roles `user` and `admin`.  
> These users are referenced in `backend/tests/auth-admin.test.js`.  
> **Do NOT deactivate these users or change their passwords**, as automated tests depend on them.
