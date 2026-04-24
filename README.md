# Mini CRM (MERN Stack)

This project is a simple Customer Relationship Management (CRM) system built using the MERN stack. The goal was to create a clean and functional application that can manage leads, companies, and tasks while also demonstrating authentication and basic data relationships.

---

## 🚀 What this project does

The application allows users to:

* Log in securely using JWT authentication
* Create and manage leads
* Search and filter leads easily
* Soft delete leads (so data is not permanently lost)
* Manage companies and view their details
* Create and track tasks assigned to leads
* View basic analytics on a dashboard

The UI is kept simple but functional, focusing more on logic and backend integration.

---

## 🛠️ Tech Stack

**Frontend**

* React
* React Router
* Axios
* Material UI (basic usage)

**Backend**

* Node.js
* Express.js
* MongoDB (with Mongoose)

**Authentication**

* JWT (JSON Web Token)
* bcrypt for password hashing

---

## 🔐 Authentication Flow

Users can log in using email and password.
After login:

* A JWT token is generated
* Token is stored in localStorage
* All protected routes require this token

This ensures only authenticated users can access the system.

---

## 📊 Modules Overview

### 1. Leads

* Add, edit, and delete leads
* Search and filter by status
* Soft delete implemented using `isDeleted` flag
* Only active leads are shown in the UI

---

### 2. Companies

* Create and view companies
* Each company stores basic details like industry and location
* Can be extended to link with leads

---

### 3. Tasks

* Create tasks related to leads
* Update task status (Pending → Completed)
* Delete tasks if needed
* Uses `populate()` to display lead information

---

### 4. Dashboard

* Displays:

  * Total leads
  * Qualified leads
* Data is fetched using aggregation logic from backend

---

## ⚙️ Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd mini-crm
```

---

### 2. Backend setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 3. Frontend setup

```bash
cd client
npm install
npm start
```

---

## 🌐 Deployment

* Frontend deployed using Netlify
* Backend deployed using Render

Make sure to update the API base URL in frontend after deploying backend.

---

## 📌 Notes

* Soft delete is used instead of permanent deletion
* Relationships are handled using MongoDB ObjectId references
* `populate()` is used to fetch related data (like lead in tasks)
* UI is intentionally minimal to focus on functionality

---

## 🙌 Final Thoughts

This project was built to understand how a full-stack application works end-to-end — from authentication to API integration and UI handling.

It’s not overly complex, but it covers all the important concepts needed for a real-world MERN application.

