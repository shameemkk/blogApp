# Blog Application

A simple blog application built with the MERN stack.

## Features

- User authentication (Sign Up, Login, Logout)
- Create, Read, Update, and Delete blog posts
- View all blog posts
- View individual blog posts
- View user's own blog posts

## Technologies Used

**Client (React)**:

- React Router DOM
- Axios
- React Toastify
- Tailwind CSS

**Server (Node.js/Express)**:

- Express
- Mongoose (for MongoDB interaction)
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing
- Cookie-parser
- Dotenv

**Database**:

- MongoDB

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd blog
    ```

2.  **Set up the server:**

    Navigate to the `server` directory.

    ```bash
    cd server
    ```

    Install dependencies:

    ```bash
    npm install
    ```

    Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret Key>
    PORT=5000 # Or any desired port
    ```

    Start the server:

    ```bash
    npm start
    ```

3.  **Set up the client:**

    Navigate to the `client` directory.

    ```bash
    cd ../client
    ```

    Install dependencies:

    ```bash
    npm install
    ```

    Create a `.env` file in the `client` directory and add the following environment variables:

    ```env
    VITE_API_BASE_URL=http://localhost:5000 # Or your server URL
    ```

    Start the client development server:

    ```bash
    npm run dev
    ```

4.  **Access the application:**

    Open your web browser and go to `http://localhost:5173` (or the port shown by Vite).

## Project Structure

```
blog/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── componets/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
├── server/          # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

