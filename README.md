# LoFo - Lost & Found Platform

**LoFo** is a web-based Lost & Found platform designed to help students of Fakultas Ilmu Komputer, Universitas Indonesia (Fasilkom UI), reconnect with their lost belongings.

## About The Project

LoFo provides a centralized platform where students can report lost belongings and share information about items they have found around campus.

Students can browse available reports, search for specific items, filter reports based on different criteria, and submit their own Lost or Found reports.

Our goal is to make the process of finding lost belongings easier, more organized, and accessible to the Fasilkom UI community.

## Features

- **Browse Reports:** View available Lost and Found reports.
- **Search Items:** Search reports by item name.
- **Filter Reports:** Filter reports by type, category, and location.
- **Report Details:** View detailed information about a specific report.
- **Submit Reports:** Create a new Lost or Found report.
- **Image Upload:** Attach photos to reports (optional).
- **Contact Information:** View the contact method explicitly chosen by the reporter to be publicly displayed.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend library |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and management |
| Cloudinary | Image storage |
| Git & GitHub | Version control and collaboration |

## Project Structure

```text
lofo/
├── frontend/       # React + Vite application
├── backend/        # Express.js API
├── docs/           # Project documentation
├── .gitignore
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AARQAM/lofo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lofo
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

### Environment Variables

Create the necessary `.env` files based on the provided `.env.example` templates.

Never commit actual environment variables, API keys, or credentials to the repository.

### Running the Application

Frontend and backend are started separately.

**Frontend:**

```bash
cd frontend
npm run dev
```

**Backend:**

```bash
cd backend
npm run dev
```

Refer to the respective folder documentation for additional setup instructions.

## Documentation

Additional project documentation is available in the `docs/` directory:

- `PROJECT_PLAN.md` - Project scope, features, and team responsibilities.
- `DATABASE_DESIGN.md` - Database entities and relationships.
- `API_CONTRACT.md` - API endpoints, request formats, and response formats.
- `MOCK_DATA.json` - Shared mock data for frontend and backend development.

## Team

Developed by a team of three students as part of the RISTEK Open Class Web Development 2026 Final Project.

| Role | Responsibility |
|---|---|
| Frontend Developer 1 | To be determined |
| Frontend Developer 2 | To be determined |
| Backend Developer | To be determined |

## Project Status
Currently in development.
Currently in development.
