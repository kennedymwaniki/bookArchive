# BookWorm API - Quick Start Guide

This guide will help you get started with the BookWorm API for local development.

## Prerequisites

- Node.js (v18 or later)
- PNPM package manager
- PostgreSQL database

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bookworm-api.git
cd bookworm-api
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create environment configuration

Create a `.env` file in the root directory using the `.env.example` as a template:

```bash
# Copy the example file
cp .env.example .env

# Edit the file with your database credentials
# Update the following values:
# - PGHPST
# - PGUSER
# - PGPASSWORD
# - PGDATABASE
```

### 4. Start the development server

```bash
pnpm run start:dev
```

The API will be available at http://localhost:3000

### 5. Seed the database with sample data

```bash
pnpm run seed
```

This will create:

- 10 sample users
- Profile for each user
- 8 authors
- 12 categories
- 20 books
- 30 book reviews

## Testing the API

### Using the app.http file

If you're using Visual Studio Code with the REST Client extension, you can use the provided `app.http` file to test all API endpoints. Simply open the file and click on the "Send Request" link above each request.

### Using cURL or Postman

You can also use cURL commands (see `API_USAGE.md`) or import the API requests into Postman for testing.

## Development Workflow

1. Make changes to source code files
2. The development server will auto-reload
3. Test your changes using the app.http file or Postman
4. Run tests: `pnpm run test`
5. Lint and format code before committing: `pnpm run lint && pnpm run format`

## Database Management

The application uses TypeORM with automatic schema synchronization. When you make changes to entity files, the database schema will be updated automatically in development mode.

If you need to reset the database:

1. Drop the database tables or create a new database
2. Restart the application
3. Run the seed script

## Project Structure Overview

- `src/main.ts` - Application entry point
- `src/app.module.ts` - Main module configuration
- `src/*/*.module.ts` - Module definitions
- `src/*/*.controller.ts` - API controllers with routes
- `src/*/*.service.ts` - Business logic
- `src/*/entities/*.entity.ts` - Database entity definitions
- `src/*/dto/*.dto.ts` - Data transfer objects for validation

## Next Steps

- Explore the API endpoints in the `app.http` file
- Review the entity relationships in `src/*/entities/*.entity.ts`
- Check out the `README.md` for complete documentation
- Review the `API_USAGE.md` for detailed API examples
