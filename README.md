# Next.js To-Do Application

A full-stack To-Do application built with Next.js, Prisma, and PostgreSQL. The application features user authentication, task management (create, read, update, delete), and is containerized using Docker for easy local development and deployment.

## Features

-   **User Authentication**: Secure sign-up and login functionality
-   **Task Management**:
    -   Create new tasks with title, content, priority, and status
    -   View a list of tasks
    -   Update task status (TODO, DOING, DONE)
    -   Delete existing tasks
-   **Responsive Design**: User-friendly interface optimized for various devices
-   **Dockerized Setup**: Simplifies the development environment setup
-   **Database Integration**: Uses PostgreSQL with Prisma ORM for data management
-   **pgAdmin Integration**: Manage the PostgreSQL database with pgAdmin

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   Docker (version 20.10.0 or higher)
-   Docker Compose (included with Docker Desktop)
-   Git
-   Node.js (if you plan to run outside Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/g0ncharuk/next-todo.git
cd next-todo-app
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following environment variables:

```env
# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=todo_db

# Next.js Configuration
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Authentication Providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# pgAdmin Configuration
PGADMIN_DEFAULT_EMAIL=g0ncharuk.dev@gmail.com
PGADMIN_DEFAULT_PASSWORD=admin
PGADMIN_LISTEN_PORT=80
```

### 3. Build and Run Containers

```bash
# Start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 4. Apply Database Migrations

```bash
docker-compose exec web npm run db:push
```

### 5. Access the Application

-   Next.js Application: [http://localhost:3000](http://localhost:3000)
-   pgAdmin: [http://localhost:5050](http://localhost:5050)

## Available Scripts

-   Development: `docker-compose exec web npm run dev`
-   Build: `docker-compose exec web npm run build`
-   Start: `docker-compose exec web npm run start`
-   Lint: `docker-compose exec web npm run lint`

### Database Scripts

-   Push Schema: `docker-compose exec web npm run db:push`
-   Generate Client: `docker-compose exec web npm run db:generate`
-   Run Migrations: `docker-compose exec web npm run db:migrate`

## Testing

### Running the Tests

There are two primary ways to run Cypress tests: using the interactive Test Runner or running them in headless mode.

#### Open Cypress Test Runner (Interactive Mode)

This mode allows you to see the tests run in real-time with a graphical interface.

```bash
npx cypress open
```

**Note:** Make sure to add the following script to your `package.json` if you prefer using npm scripts:

```json
"scripts": {
  "cypress:open": "cypress open",
  // ... other scripts
}
```

#### Run Tests in Headless Mode

Ideal for continuous integration (CI) environments or when you want to run tests without the GUI.

```bash
npx cypress run
```

Or using an npm script:

```bash
npm run cypress:run
```

Add the following script to your `package.json` if you prefer using npm scripts:

````json
"scripts": {
  "cypress:run": "cypress run",
  // ... other scripts
}

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

    - Verify DATABASE_URL in .env
    - Ensure PostgreSQL service is running

2. **Port Conflicts**

    - Check if ports 3000, 5432, and 5050 are available
    - Modify host ports in docker-compose.yml if needed

3. **Environment Variables**

    - Confirm .env file exists and contains all required variables
    - Restart containers after modifying .env

4. **Authentication Issues**
    - Verify that all OAuth credentials are correctly configured
    - Ensure callback URLs are properly set up in GitHub and Google developer consoles

### Viewing Logs

```bash
docker-compose logs -f
```
