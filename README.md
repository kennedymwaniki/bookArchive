<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="BookWorm API Logo" />
</p>

<h1 align="center">BookWorm API</h1>

<p align="center">A NestJS-powered RESTful API for managing a digital library system with users, books, authors, categories, profiles, and reviews.</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/NestJS-11.0.1-red.svg" alt="NestJS Version" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeORM-0.3.24-blue.svg" alt="TypeORM Version" /></a>
  <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-Latest-blue.svg" alt="PostgreSQL" /></a>
  <a href="#"><img src="https://img.shields.io/badge/API-REST-green.svg" alt="API Type" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" /></a>
</p>

## Description

BookWorm API is a comprehensive backend system for a digital library platform. It allows users to browse books, leave reviews, and interact with various literary content. Built with NestJS and TypeORM, it offers robust entity relationships and RESTful endpoints for all necessary operations.

## Key Features

- **User Management**: Create, update, and manage user accounts
- **Book Catalog**: Comprehensive book listings with details and availability
- **Author Profiles**: Information about book authors
- **Categories**: Book categorization system
- **Reviews & Ratings**: User feedback system for books
- **User Profiles**: Extended user information
- **Data Seeding**: Automatic creation of sample data
- **API Documentation**: Detailed endpoint documentation

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: Class Validator / Class Transformer
- **Development Tools**: TypeScript, ESLint, Prettier
- **Testing**: Jest

## Live API

The API is currently deployed and available at:

```
https://bookworm-api.example.com
```

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or later)
- PNPM package manager
- PostgreSQL database (local or cloud-hosted)

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
PGHPST=your_database_host
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
DATABASE_PORT=5432

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Installation

```bash
# Install dependencies
$ pnpm install
```

## Running the Application

```bash
# Development mode
$ pnpm run start

# Watch mode (auto-reload on changes)
$ pnpm run start:dev

# Production mode
$ pnpm run start:prod
```

## Database Seeding

To populate your database with sample data:

```bash
# Seed the database with test data
$ pnpm run seed
```

## Testing

```bash
# Unit tests
$ pnpm run test

# E2E tests
$ pnpm run test:e2e

# Test coverage reports
$ pnpm run test:cov
```

## API Endpoints

### User Endpoints

| Method | Endpoint    | Description       | Request Body                              |
| ------ | ----------- | ----------------- | ----------------------------------------- |
| GET    | `/user`     | Get all users     | -                                         |
| GET    | `/user/:id` | Get user by ID    | -                                         |
| POST   | `/user`     | Create a new user | `{ name, email, password }`               |
| PATCH  | `/user/:id` | Update a user     | `{ name?, email?, password?, isActive? }` |
| DELETE | `/user/:id` | Delete a user     | -                                         |

### Profile Endpoints

| Method | Endpoint       | Description          | Request Body                   |
| ------ | -------------- | -------------------- | ------------------------------ |
| GET    | `/profile`     | Get all profiles     | -                              |
| GET    | `/profile/:id` | Get profile by ID    | -                              |
| POST   | `/profile`     | Create a new profile | `{ userId, bio, avatar, dob }` |
| PATCH  | `/profile/:id` | Update a profile     | `{ bio?, avatar?, dob? }`      |
| DELETE | `/profile/:id` | Delete a profile     | -                              |

### Author Endpoints

| Method | Endpoint      | Description         | Request Body                             |
| ------ | ------------- | ------------------- | ---------------------------------------- |
| GET    | `/author`     | Get all authors     | -                                        |
| GET    | `/author/:id` | Get author by ID    | -                                        |
| POST   | `/author`     | Create a new author | `{ name, bio, birthDate, isActive? }`    |
| PATCH  | `/author/:id` | Update an author    | `{ name?, bio?, birthDate?, isActive? }` |
| DELETE | `/author/:id` | Delete an author    | -                                        |

### Book Endpoints

| Method | Endpoint       | Description              | Request Body                                                                        |
| ------ | -------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| GET    | `/book`        | Get all books            | -                                                                                   |
| GET    | `/book/:id`    | Get book by ID           | -                                                                                   |
| GET    | `/book/search` | Search books by criteria | Query params: `title`, `author`, `category`                                         |
| POST   | `/book`        | Create a new book        | `{ title, description, publicationYear, authorId, categoryIds?, isAvailable? }`     |
| PATCH  | `/book/:id`    | Update a book            | `{ title?, description?, publicationYear?, isAvailable?, authorId?, categoryIds? }` |
| DELETE | `/book/:id`    | Delete a book            | -                                                                                   |

### Category Endpoints

| Method | Endpoint        | Description           | Request Body              |
| ------ | --------------- | --------------------- | ------------------------- |
| GET    | `/category`     | Get all categories    | -                         |
| GET    | `/category/:id` | Get category by ID    | -                         |
| POST   | `/category`     | Create a new category | `{ name, description }`   |
| PATCH  | `/category/:id` | Update a category     | `{ name?, description? }` |
| DELETE | `/category/:id` | Delete a category     | -                         |

### Book Review Endpoints

| Method | Endpoint          | Description              | Request Body                          |
| ------ | ----------------- | ------------------------ | ------------------------------------- |
| GET    | `/bookreview`     | Get all book reviews     | -                                     |
| GET    | `/bookreview/:id` | Get book review by ID    | -                                     |
| POST   | `/bookreview`     | Create a new book review | `{ content, rating, bookId, userId }` |
| PATCH  | `/bookreview/:id` | Update a book review     | `{ content?, rating? }`               |
| DELETE | `/bookreview/:id` | Delete a book review     | -                                     |

## API Testing

You can test the API endpoints using the provided `app.http` file which contains sample requests for all endpoints. If you're using VS Code, consider installing the "REST Client" extension to execute these requests directly from the editor.

## Database Schema

The application uses a relational database with the following entity relationships:

### Core Entities

- **User**: Base user account information
- **Profile**: Extended user information (one-to-one with User)
- **Author**: Information about book authors
- **Book**: Book details with relations to Author and Categories
- **Category**: Book categorization
- **BookReview**: User reviews for books

### Entity Relationships

- User (1) ←→ (1) Profile
- User (1) ←→ (n) BookReview
- Author (1) ←→ (n) Book
- Book (n) ←→ (m) Category
- Book (1) ←→ (n) BookReview

## Data Models

### User Entity

```typescript
{
  id: string; // UUID primary key
  name: string; // User's full name
  email: string; // Unique email address
  password: string; // Hashed password (stored securely)
  isActive: boolean; // Account status
  createdAt: string; // Account creation timestamp
}
```

### Profile Entity

```typescript
{
  id: string; // UUID primary key
  name: string; // Profile display name
  bio: string; // User biography
  avatar: string; // URL to profile image
  dob: string; // Date of birth (YYYY-MM-DD)
  userId: string; // Foreign key to User
}
```

### Author Entity

```typescript
{
  id: string; // UUID primary key
  name: string; // Author's full name
  bio: string; // Author biography
  birthDate: string; // Date of birth (YYYY-MM-DD)
  isActive: boolean; // Author status
}
```

### Book Entity

```typescript
{
  id: string; // UUID primary key
  title: string; // Book title
  description: string; // Book description
  publicationYear: string; // Publication date (YYYY-MM-DD)
  isAvailable: boolean; // Availability status
}
```

### Category Entity

```typescript
{
  id: string; // UUID primary key
  name: string; // Category name
  description: string; // Category description
}
```

### BookReview Entity

```typescript
{
  id: string; // UUID primary key
  content: string; // Review content
  rating: number; // Rating (1-5)
  createdAt: string; // Review timestamp
  bookId: string; // Foreign key to Book
  userId: string; // Foreign key to User
}
```

## API Security

While the current implementation focuses on core functionality, the following security measures should be implemented for production use:

### Authentication

- JWT (JSON Web Token) based authentication
- Secure password hashing with bcrypt
- Token refresh mechanism

### Authorization

- Role-based access control (RBAC)
- User vs. Admin permissions
- Resource ownership validation

### Data Protection

- Input validation using class-validator
- Sanitization of user inputs
- SQL injection prevention via TypeORM

### API Rate Limiting

- Implement rate limiting to prevent abuse
- Set appropriate limits for different endpoints

### CORS Configuration

- Configure Cross-Origin Resource Sharing policies
- Restrict access to trusted domains

## API Performance Optimization

To ensure optimal API performance, consider implementing:

1. **Response Caching**: Cache frequently accessed data
2. **Pagination**: Implement pagination for list endpoints
3. **Data Serialization**: Use DTOs to control response data
4. **Eager/Lazy Loading**: Configure appropriate relation loading strategies
5. **Database Indexing**: Index frequently queried fields

## Development Workflow

1. **Setup Development Environment**:

   - Clone repository
   - Install dependencies with `pnpm install`
   - Configure local PostgreSQL database
   - Create `.env` file with environment variables

2. **Development Process**:

   - Run in development mode with `pnpm run start:dev`
   - Seed database with `pnpm run seed`
   - Test API endpoints using the app.http file

3. **Code Quality**:
   - Format code with `pnpm run format`
   - Lint code with `pnpm run lint`
   - Write unit tests for new features
   - Run tests with `pnpm run test`

## Additional Documentation

For more detailed information, please refer to the following documents:

1. **[Quick Start Guide](./QUICK_START.md)**: Get up and running quickly with step-by-step instructions
2. **[API Usage Examples](./API_USAGE.md)**: Detailed examples of API requests and responses
3. **[Environment Configuration](./.env.example)**: Sample environment variables for configuration

## NestJS Resources

If you're new to NestJS or need additional references:

- [NestJS Documentation](https://docs.nestjs.com) - Official framework documentation
- [TypeORM Documentation](https://typeorm.io/) - Database ORM used in this project
- [Class Validator](https://github.com/typestack/class-validator) - Validation library used for DTOs
