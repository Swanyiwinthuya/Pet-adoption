# 🚀 Pet Adoption System API Documentation

## **Base URL**
```
http://localhost:3000/api
```

## **🔐 Authentication**
*Note: Authentication endpoints are placeholders and need to be implemented*

---

## **🐕 Pets API**

### **Get All Pets**
```http
GET /api/pets
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 25)
- `animal` (optional): Filter by animal type
- `breed` (optional): Filter by breed (case-insensitive)
- `age` (optional): Filter by age

**Example:**
```http
GET /api/pets?animal=dog&breed=Golden&page=1&limit=10
```

**Response:**
```json
{
  "pets": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Max",
      "animal": "dog",
      "breed": "Golden Retriever",
      "age": 2,
      "medicalCondition": "Healthy, fully vaccinated",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### **Create New Pet**
```http
POST /api/pets
```

**Request Body:**
```json
{
  "name": "Luna",
  "animal": "cat",
  "breed": "Domestic Shorthair",
  "age": 1,
  "medicalCondition": "Healthy, spayed, needs regular checkups"
}
```

**Required Fields:**
- `name`: String (max 50 chars)
- `animal`: String (enum: dog, cat, bird, rabbit, hamster, fish, other)
- `breed`: String
- `age`: Number (0-30)
- `medicalCondition`: String (max 500 chars)

**Response:**
```json
{
  "message": "Pet created successfully",
  "pet": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Luna",
    "animal": "cat",
    "breed": "Domestic Shorthair",
    "age": 1,
    "medicalCondition": "Healthy, spayed, needs regular checkups",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **Get Pet by ID**
```http
GET /api/pets/{id}
```

**Response:**
```json
{
  "pet": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Max",
    "animal": "dog",
    "breed": "Golden Retriever",
    "age": 2,
    "medicalCondition": "Healthy, fully vaccinated",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **Update Pet**
```http
PUT /api/pets/{id}
```

**Request Body:** (any fields to update)
```json
{
  "age": 3,
  "medicalCondition": "Healthy, fully vaccinated, microchipped"
}
```

### **Delete Pet**
```http
DELETE /api/pets/{id}
```

---

## **👥 Users API**

### **Get All Users**
```http
GET /api/users
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 25)

**Response:** (passwords excluded)
```json
{
  "users": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "email": "john@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "photo": "https://example.com/photo.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

### **Create New User (Registration)**
```http
POST /api/users
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+1234567890",
  "photo": "https://example.com/photo.jpg"
}
```

**Required Fields:**
- `email`: String (valid email format)
- `password`: String (min 6 chars)
- `name`: String (max 100 chars)
- `phone`: String (valid phone format)
- `photo`: String (optional, valid URL)

### **Get User by ID**
```http
GET /api/users/{id}
```

### **Update User**
```http
PUT /api/users/{id}
```

### **Delete User**
```http
DELETE /api/users/{id}
```

---

## **👨‍💼 Admin API**

### **Get All Admins**
```http
GET /api/admin
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 25)

### **Create New Admin**
```http
POST /api/admin
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Required Fields:**
- `email`: String (valid email format)
- `password`: String (min 6 chars)

---

## **📋 Adoption Requests API**

### **Get All Adoption Requests**
```http
GET /api/requests
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 25)
- `pet` (optional): Filter by pet ID
- `userName` (optional): Filter by user name (case-insensitive)

**Response:** (with populated pet details)
```json
{
  "requests": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "userName": "John Doe",
      "phoneNumber": "+1234567890",
      "pet": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "Max",
        "animal": "dog",
        "breed": "Golden Retriever",
        "age": 2,
        "medicalCondition": "Healthy, fully vaccinated"
      },
      "pickupDate": "2024-01-15T00:00:00.000Z",
      "message": "I want to adopt this pet",
      "responsibilityAccepted": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

### **Create New Adoption Request**
```http
POST /api/requests
```

**Request Body:**
```json
{
  "userName": "John Doe",
  "phoneNumber": "+1234567890",
  "pet": "64f8a1b2c3d4e5f6a7b8c9d0",
  "pickupDate": "2024-01-15T00:00:00.000Z",
  "message": "I have responsibility for adopting the pet",
  "responsibilityAccepted": true
}
```

**Required Fields:**
- `userName`: String (max 100 chars)
- `phoneNumber`: String (valid phone format)
- `pet`: String (valid pet ID)
- `pickupDate`: Date (must be in the future)
- `message`: String (max 1000 chars)
- `responsibilityAccepted`: Boolean (must be true)

**Important:** The `responsibilityAccepted` field must be `true` for the request to be submitted.

### **Get Adoption Request by ID**
```http
GET /api/requests/{id}
```

### **Update Adoption Request**
```http
PUT /api/requests/{id}
```

### **Delete Adoption Request**
```http
DELETE /api/requests/{id}
```

---

## **🏥 Health Check API**

### **Get System Health**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 12345678,
    "heapTotal": 9876543,
    "heapUsed": 5432109,
    "external": 1234
  },
  "database": {
    "status": "healthy",
    "message": "Database connection is working"
  }
}
```

---

## **📊 Error Responses**

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

---

## **🔒 Security Notes**

- **Passwords**: Automatically hashed using bcrypt
- **Validation**: All inputs are validated and sanitized
- **Relationships**: Pet references are validated before creation
- **Responsibility**: Adoption requests require explicit responsibility acceptance

---

## **🚀 Testing the API**

### **1. Test Health Check:**
```bash
curl http://localhost:3000/api/health
```

### **2. Test Pet Creation:**
```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy",
    "animal": "dog",
    "breed": "Labrador",
    "age": 3,
    "medicalCondition": "Healthy, vaccinated"
  }'
```

### **3. Test User Registration:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "phone": "+1234567890"
  }'
```

Your backend is now complete and ready for testing! 🎉
