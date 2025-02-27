# Ausome Project

Ausome is a social media platform designed to connect users through posts, comments, likes, and friendships. This project is built using a Node.js backend with Express and a PostgreSQL database, and a React frontend with Vite.

## Purpose

Ausome is specifically designed to support and connect individuals on the autism spectrum. The platform aims to provide a safe and inclusive space where users can share their experiences, find resources, and build meaningful connections.

## Backend

The backend is responsible for handling API requests, managing the database, and implementing business logic. Key features include:

- User authentication and authorization
- CRUD operations for users, posts, comments, likes, and resources
- Friend request management
- Database triggers and functions for maintaining data integrity

### Technologies

- Node.js
- Express
- PostgreSQL
- JWT for authentication

## Frontend

The frontend is built using React and Vite, providing a fast and modern development experience. Key features include:

- User-friendly interface for interacting with the platform
- Real-time updates and notifications
- Responsive design

### Technologies

- React
- Vite
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/ausome.git
   ```

2. Navigate to the project directory:

   ```sh
   cd ausome
   ```

3. Install backend dependencies:

   ```sh
   cd backend
   npm install
   ```

4. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

### Running the Project

1. Start the PostgreSQL database and create the necessary tables:

   ```sh
   psql -f backend/db/schema.sql
   psql -f backend/db/seed.sql
   ```

2. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

3. Start the frontend development server:

   ```sh
   cd ../frontend
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
