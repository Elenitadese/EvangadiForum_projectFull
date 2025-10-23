# 🧩 Evangadi Forum Frontend

This is the **frontend** of the Evangadi Forum project — a web application that allows users to register, log in, ask questions, and post answers.  
Built with **React (Vite)** for a fast, modern, and responsive interface.

---

## 🚀 Tech Stack

- **React 19 (Vite)**
- **React Router DOM**
- **Axios**
- **CSS3 / Responsive Design**
- **Node.js (for local dev environment)**

---

## 📂 Folder Structure

Frontend/
│
├── public/
│ └── index.html
│
├── src/
│ ├── assets/ # Images and icons
│ ├── pages/ # All page components
│ │ ├── AboutMessage.jsx
│ │ ├── Answers.jsx
│ │ ├── EditQuestion.jsx
│ │ ├── HowitWork.jsx
│ │ ├── QuestionDetail.jsx
│ │ ├── QuestionsList.jsx
│ │ └── Home.css
│ │
│ ├── App.jsx # Main routes and layout
│ ├── App.css
│ ├── main.jsx # React entry file
│ ├── index.css
│ └── axios/axios.js # Axios base setup (API URL)
│
├── .env # Contains backend API URL (not pushed to Git)
├── package.json
└── vite.config.js

---

## ⚙️ Setup & Installation

1. **Navigate into the frontend folder**
   ```bash
   cd Frontend
   ```
2. Install dependencies
   npm install
3. Start the development server
   npm run dev
   🧱 Build for Production
   npm run build
   🧩 Scripts Overview
   | Command | Description |
   | ----------------- | ---------------------------------- |
   | `npm run dev` | Start local dev server |
   | `npm run build` | Build optimized production files |
   | `npm run preview` | Preview production build |
   | `npm run lint` | Run ESLint for code quality checks |
   🧠 Key Features

Login and Registration system
Ask / Edit / Delete questions
Post and view answers
Responsive design
Smooth navigation with React Router

🧑‍💻 Developer

Eleni Tadese Teklemariam
Juniour Web Developer — React | Node.js | MySQL

---

## ⚙️ **Backend README.md**

**File path:** `Backend/README.md`

````markdown
# 🧩 Evangadi Forum Backend

This is the **backend** API for the Evangadi Forum project.  
Built with **Node.js**, **Express**, and **MySQL**.  
It handles authentication, questions, and answers management.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **dotenv**
- **bcrypt** (password hashing)
- **jsonwebtoken** (authentication)
- **cors**
- **nodemon**

---

## 📂 Folder Structure

Backend/
│
├── app.js # Main server entry
├── .env # Environment variables (not pushed)
│
├── routes/
│ ├── userRoutes.js
│ ├── questionRoutes.js
│ └── answerRoutes.js
│
├── controllers/
│ ├── userController.js
│ ├── questionController.js
│ └── answerController.js
│
├── config/
│ └── db.js # MySQL connection setup
│
└── package.json

---

## ⚙️ Setup & Installation

1. **Navigate to the backend folder**
   ```bash
   cd Backend
   ```
2. Install dependencies
   npm install
3. Create a .env file in the root of Backend with the following:
   PORT= your port
   DB_HOST=localhost
   DB_USER=your Database user
   DB_PASSWORD=yourpassword
   DB_NAME=YOur db name
   JWT_SECRET=your_secret_key
4. Start the backend server
   npm start
````
🧱 API Endpoints
🔐 Authentication Routes
| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | /api/users/register | Register new user   |
| POST   | /api/users/login    | Login existing user |

❓ Question Routes
| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /api/questions     | Get all questions     |
| POST   | /api/questions     | Create a new question |
| GET    | /api/questions/:id | Get question by ID    |
| PUT    | /api/questions/:id | Edit question         |
| DELETE | /api/questions/:id | Delete question       |

💬 Answer Routes
| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | /api/answers/:q_id | Get answers for question |
| POST   | /api/answers       | Post new answer          |

🧠 Key Features

JWT Authentication (secure login/register)
Password encryption using bcrypt
CRUD for Questions and Answers
CORS-enabled REST API
MySQL relational data management

📡 Run the Full Stack App

Start both backend and frontend simultaneously:

# Terminal 1
cd Backend
npm run dev

# Terminal 2
cd Frontend
npm run dev
