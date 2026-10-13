# Sweet Delight Cake Shop - Backend Setup Guide

## Overview
This document provides complete instructions for setting up the Java Spring Boot backend for the Sweet Delight Cake Shop application.

## Technology Stack

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **JWT Authentication**
- **Maven**

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    mobile VARCHAR(15),
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Categories Table
```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Products Table
```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id BIGINT,
    image_url VARCHAR(500),
    rating DECIMAL(2, 1) DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 4. Inventory Table
```sql
CREATE TABLE inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNIQUE NOT NULL,
    stock_quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 5,
    last_restocked TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 5. Orders Table
```sql
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id BIGINT,
    customer_name VARCHAR(100) NOT NULL,
    customer_mobile VARCHAR(15) NOT NULL,
    customer_email VARCHAR(100),
    delivery_address TEXT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    gst_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('CASH', 'CARD', 'UPI') NOT NULL,
    order_status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 6. Order Items Table
```sql
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 7. Customers Table
```sql
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobile VARCHAR(15) NOT NULL,
    address TEXT,
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 8. Payments Table
```sql
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNIQUE NOT NULL,
    payment_method ENUM('CASH', 'CARD', 'UPI') NOT NULL,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    transaction_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## API Endpoints

### Authentication APIs

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
    "username": "john_doe",
    "password": "SecurePass123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "mobile": "+919876543210"
}

Response: 201 Created
{
    "message": "User registered successfully",
    "userId": 1
}
```

#### 2. Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
    "username": "john_doe",
    "password": "SecurePass123"
}

Response: 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "userId": 1,
    "username": "john_doe",
    "role": "CUSTOMER"
}
```

### Product APIs

#### 3. Get All Products
```
GET /api/products
Response: 200 OK
[
    {
        "id": 1,
        "name": "Chocolate Birthday Cake",
        "description": "Rich chocolate cake with creamy frosting",
        "price": 899.00,
        "category": "Birthday Cakes",
        "imageUrl": "...",
        "rating": 4.8,
        "isFeatured": true
    }
]
```

#### 4. Get Product by ID
```
GET /api/products/{id}
Response: 200 OK
```

#### 5. Create Product (Admin Only)
```
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
    "name": "New Cake",
    "description": "Delicious new cake",
    "price": 999.00,
    "categoryId": 1,
    "imageUrl": "...",
    "isFeatured": false
}
```

#### 6. Update Product (Admin Only)
```
PUT /api/products/{id}
Authorization: Bearer {token}
```

#### 7. Delete Product (Admin Only)
```
DELETE /api/products/{id}
Authorization: Bearer {token}
```

### Category APIs

#### 8. Get All Categories
```
GET /api/categories
Response: 200 OK
```

#### 9. Create Category (Admin Only)
```
POST /api/categories
Authorization: Bearer {token}
```

### Order APIs

#### 10. Create Order
```
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
    "customerName": "Priya Sharma",
    "customerMobile": "+919876543210",
    "customerEmail": "priya@example.com",
    "deliveryAddress": "123 Main St, City",
    "items": [
        {
            "productId": 1,
            "quantity": 2
        }
    ],
    "paymentMethod": "CASH",
    "discountPercentage": 10
}

Response: 201 Created
{
    "orderNumber": "SD001234567",
    "totalAmount": 1798.00,
    "orderStatus": "PENDING"
}
```

#### 11. Get Order by Order Number
```
GET /api/orders/{orderNumber}
Authorization: Bearer {token}
```

#### 12. Get User Orders
```
GET /api/orders/user/{userId}
Authorization: Bearer {token}
```

#### 13. Update Order Status (Admin Only)
```
PATCH /api/orders/{orderNumber}/status
Authorization: Bearer {token}

Request Body:
{
    "status": "COMPLETED"
}
```

### Cart APIs

#### 14. Get Cart
```
GET /api/cart
Authorization: Bearer {token}
```

#### 15. Add to Cart
```
POST /api/cart/items
Authorization: Bearer {token}

Request Body:
{
    "productId": 1,
    "quantity": 1
}
```

#### 16. Update Cart Item
```
PUT /api/cart/items/{itemId}
Authorization: Bearer {token}
```

#### 17. Remove from Cart
```
DELETE /api/cart/items/{itemId}
Authorization: Bearer {token}
```

### Admin Dashboard APIs

#### 18. Get Dashboard Stats
```
GET /api/admin/dashboard/stats
Authorization: Bearer {token}

Response:
{
    "totalSales": 124500.00,
    "totalOrders": 342,
    "totalCustomers": 1234,
    "totalProducts": 28
}
```

#### 19. Get Sales Report
```
GET /api/admin/reports/sales?startDate=2026-01-01&endDate=2026-06-30
Authorization: Bearer {token}
```

#### 20. Get Inventory
```
GET /api/admin/inventory
Authorization: Bearer {token}
```

## Spring Boot Project Structure

```
sweet-delight-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── sweetdelight/
│   │   │           ├── SweetDelightApplication.java
│   │   │           ├── config/
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   └── JwtConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── ProductController.java
│   │   │           │   ├── OrderController.java
│   │   │           │   ├── CartController.java
│   │   │           │   └── AdminController.java
│   │   │           ├── model/
│   │   │           │   ├── User.java
│   │   │           │   ├── Product.java
│   │   │           │   ├── Order.java
│   │   │           │   ├── OrderItem.java
│   │   │           │   ├── Category.java
│   │   │           │   ├── Customer.java
│   │   │           │   ├── Payment.java
│   │   │           │   └── Inventory.java
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── ProductRepository.java
│   │   │           │   ├── OrderRepository.java
│   │   │           │   ├── CategoryRepository.java
│   │   │           │   └── InventoryRepository.java
│   │   │           ├── service/
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── ProductService.java
│   │   │           │   ├── OrderService.java
│   │   │           │   ├── CartService.java
│   │   │           │   └── AdminService.java
│   │   │           ├── dto/
│   │   │           │   ├── LoginRequest.java
│   │   │           │   ├── RegisterRequest.java
│   │   │           │   ├── OrderRequest.java
│   │   │           │   └── ProductRequest.java
│   │   │           └── security/
│   │   │               ├── JwtTokenProvider.java
│   │   │               └── JwtAuthenticationFilter.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/
└── pom.xml
```

## application.properties

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/sweet_delight_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=yourSecretKeyForJWTTokenGenerationMustBeLongEnough
jwt.expiration=86400000

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## pom.xml Dependencies

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Spring Boot Starter Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- MySQL Connector -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

## Sample Data (data.sql)

```sql
-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Birthday Cakes', 'Delicious cakes for birthday celebrations'),
('Wedding Cakes', 'Elegant cakes for weddings'),
('Anniversary Cakes', 'Special cakes for anniversaries'),
('Custom Cakes', 'Personalized custom cakes'),
('Eggless Cakes', 'Cakes without eggs'),
('Brownies', 'Rich chocolate brownies'),
('Chocolates', 'Premium chocolates and truffles');

-- Insert Sample Products
INSERT INTO products (name, description, price, category_id, image_url, rating, is_featured) VALUES
('Chocolate Birthday Cake', 'Rich chocolate cake with creamy frosting', 899.00, 1, 'https://images.unsplash.com/...', 4.8, true),
('Vanilla Rainbow Cake', 'Colorful layers of vanilla cake', 749.00, 1, 'https://images.unsplash.com/...', 4.9, true);

-- Insert Admin User (password: admin123 - hashed with BCrypt)
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', '$2a$10$...', 'admin@sweetdelight.com', 'Administrator', 'ADMIN');
```

## Setup Instructions

### 1. Install Prerequisites
- Java 17 or higher
- MySQL 8.0
- Maven 3.8+

### 2. Create Database
```sql
CREATE DATABASE sweet_delight_db;
```

### 3. Clone and Configure
```bash
# Clone the project
git clone <repository-url>
cd sweet-delight-backend

# Update application.properties with your database credentials
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### 5. Test the API
```bash
# Test health endpoint
curl http://localhost:8080/api/health

# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123","email":"test@example.com"}'
```

## Security Features

1. **JWT Authentication** - Stateless token-based authentication
2. **Password Encryption** - BCrypt password hashing
3. **Role-Based Access Control** - Admin and Customer roles
4. **CORS Protection** - Configured for frontend origins
5. **SQL Injection Prevention** - JPA parameterized queries

## Frontend Integration

Update your frontend to call these APIs:

```typescript
// Example: Login API call
const login = async (username: string, password: string) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};
```

## Production Deployment

### Environment Variables
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://production-db:3306/sweet_delight_db
SPRING_DATASOURCE_USERNAME=prod_user
SPRING_DATASOURCE_PASSWORD=secure_password
JWT_SECRET=your_production_secret_key
```

### Build JAR
```bash
mvn clean package
java -jar target/sweet-delight-0.0.1-SNAPSHOT.jar
```

## Support

For backend setup assistance:
- Email: dev@sweetdelight.com
- Documentation: https://docs.sweetdelight.com

---
**Note:** This backend is designed to work seamlessly with the Sweet Delight React frontend. Ensure both are running for full functionality.
