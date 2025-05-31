# BookWorm API Usage Examples

This document provides practical examples for using the BookWorm API. All examples use curl for simplicity, but the same requests can be made with any HTTP client.

## Base URL

For local development:

```
http://localhost:3000
```

For production:

```
https://bookworm-api.example.com
```

## Authentication (For future implementation)

Most endpoints will require authentication via a JWT token:

```bash
curl -X GET http://localhost:3000/book \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## User Endpoints

### Create a new user

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123"
  }'
```

### Get all users

```bash
curl -X GET http://localhost:3000/user
```

### Get user by ID

```bash
curl -X GET http://localhost:3000/user/123e4567-e89b-12d3-a456-426614174000
```

### Update user

```bash
curl -X PATCH http://localhost:3000/user/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith"
  }'
```

### Delete user

```bash
curl -X DELETE http://localhost:3000/user/123e4567-e89b-12d3-a456-426614174000
```

## Profile Endpoints

### Create a profile

```bash
curl -X POST http://localhost:3000/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "bio": "Book enthusiast and avid reader",
    "avatar": "https://example.com/avatar.jpg",
    "dob": "1990-01-01",
    "userId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Get profile by user ID

```bash
curl -X GET http://localhost:3000/profile/123e4567-e89b-12d3-a456-426614174000
```

## Author Endpoints

### Create an author

```bash
curl -X POST http://localhost:3000/author \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J.K. Rowling",
    "bio": "British author best known for the Harry Potter series",
    "birthDate": "1965-07-31",
    "isActive": true
  }'
```

### Get all authors

```bash
curl -X GET http://localhost:3000/author
```

## Book Endpoints

### Create a book

```bash
curl -X POST http://localhost:3000/book \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher\"s Stone",
    "description": "The first novel in the Harry Potter series",
    "publicationYear": "1997-06-26",
    "isAvailable": true,
    "authorId": "123e4567-e89b-12d3-a456-426614174000",
    "categoryIds": ["123e4567-e89b-12d3-a456-426614174001", "123e4567-e89b-12d3-a456-426614174002"]
  }'
```

### Search for books

```bash
# Search by title
curl -X GET "http://localhost:3000/book/search?title=Harry"

# Search by author
curl -X GET "http://localhost:3000/book/search?author=Rowling"

# Search by category
curl -X GET "http://localhost:3000/book/search?category=Fantasy"

# Combined search
curl -X GET "http://localhost:3000/book/search?title=Harry&author=Rowling&category=Fantasy"
```

## Category Endpoints

### Create a category

```bash
curl -X POST http://localhost:3000/category \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fantasy",
    "description": "Fiction that features magical and supernatural elements"
  }'
```

### Get all categories

```bash
curl -X GET http://localhost:3000/category
```

## Book Review Endpoints

### Create a book review

```bash
curl -X POST http://localhost:3000/bookreview \
  -H "Content-Type: application/json" \
  -d '{
    "content": "An excellent book that captivates readers of all ages!",
    "rating": 5,
    "bookId": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174001"
  }'
```

### Get all reviews for a book

```bash
curl -X GET "http://localhost:3000/bookreview?bookId=123e4567-e89b-12d3-a456-426614174000"
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error response format:

```json
{
  "statusCode": 404,
  "message": "Book with ID 123e4567-e89b-12d3-a456-426614174000 not found",
  "error": "Not Found"
}
```
