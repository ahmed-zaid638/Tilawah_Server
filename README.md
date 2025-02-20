# Tilawah Server 📖🚀

![Node.js](https://img.shields.io/badge/Node.js-v20.17.0-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.6-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v17-316192?style=for-the-badge&logo=postgresql)
![Express.js](https://img.shields.io/badge/Express.js-v4.21.0-lightgrey?style=for-the-badge&logo=express)

Tilawah Server is a scalable backend server designed for managing content related to Quran recitation, using Node.js, TypeScript, and PostgreSQL for handling data storage, logic, and routing.

## Features ✨

- **Node.js** backend for fast and scalable performance.
- **TypeScript** for static typing and better development experience.
- **PostgreSQL** database for reliable, structured data management.
- **RESTful API** structure for easy integration.
- **Authentication & Authorization** to secure API endpoints.

## Project Structure 🏗️

```bash
tilawah-server/
│
├── dist/                      # Compiled JavaScript files
├── node_modules/               # Dependencies
├── src/                        # Main sourcs code
│   ├── config/                 # Configuration files
│   ├── controllers/            # Controllers (business logic)
│   ├── middlewares/            # Middlewares (e.g., authentication)
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── services/               # Services (database interaction, logic)
│   ├── utils/                  # Utility functions
│   ├── validations/            # Validation schemas
│   ├── tests/                  # Test cases
│   ├── types/                  # Type definitions
│   └── server.ts               # Server entry point
├── .env                        # Environment variables
├── .gitignore                  # Ignored files for Git
├── package.json                # Node.js project metadata
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
