
# 🚴 RideNest

## Objective
A robust **Express** application built with **TypeScript** and **MongoDB (Mongoose)** to manage a Bicycle Store. The API enables CRUD operations on products (bicycles), manages customer orders, and ensures data integrity using schema validation.

---

- **Website Live Link**: <a href="https://bi-cycle-store-api.vercel.app" target="_blank" rel="noopener noreferrer">RideNest</a>
  **VIDIO Review Link**: <a href="https://drive.google.com/file/d/1rkxy8kzlnTDsp6-tHLp9seautfS-IrOk/view?usp=sharing" target="_blank" rel="noopener noreferrer">Video Presentation</a>

## Features ✨
- **Bicycle Management**: Add, retrieve, update, and delete bicycles with detailed attributes like brand, type, price, stock status, etc.
- **Order Management**: Place orders with inventory management logic to handle stock updates and validations.
- **Revenue Calculation**: Aggregates total revenue from all orders placed in the store.
- **Robust Validation**: Includes comprehensive data validation and error handling for all endpoints.
- **Search Functionality**: Query bicycles based on name, brand, or type.
- **Real-Time Stock Updates**: Automatically adjusts stock levels upon successful orders.

## Authentication ✨
- **User**: Admin and Customer role base user login
- **Managmet**: Store, Order, Profile, Changed Password, All user, Creat product

---


## Admin Credentials ✨
 ```json
    {
        "email": "farukk7920@gmail.com",
        "password": "1234",
    } 

---

## Tech Stack 🛠️
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (via Mongoose).
- **Validation**: Zod
- **Error Handling**: Centralized error handler with clear, structured responses
- **Tools**: ESLint, Prettier, Nodemon, TypeScript Compiler

---

## Project API Root

### Bicycle APIs
- **Create Bicycle API**  
  - **Endpoint**: `/api/bicycle`  
  - **Method**: `POST` 
  - **Request Body**: 
    ```json
    {
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 300,
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 20,
        "inStock": true
    }


- **Get All Bicycles API**  
  - **Endpoint**: `/api/bicycle`  
  - **Method**: `GET`  

- **Get Single Bicycle API**  
  - **Endpoint**: `/api/products/:productId`  
  - **Method**: `GET`  

- **Update Bicycle API**  
  - **Endpoint**: `/api/bicycle/:bicycleId`  
  - **Method**: `PATCH` 
  - **Request Body**: 
    ```json
    { 
        "price": 350,
        "quantity": 15
    } 

- **Delete Bicycle API**  
  - **Endpoint**: `/api/bicycle/:bicycleId`  
  - **Method**: `DELETE`  

### Order APIs
- **Order a Bicycle API**  
  - **Endpoint**: `/api/orders`  
  - **Method**: `POST`
  - **Request Body**: 
    ```json
    {
        "email": "customerr@example.com",
        "product": "648a45e5f0123c45678d9012",
        "quantity": 2,
        "totalPrice": 600
    }   

- **Calculate Revenue from Orders API**  
  - **Endpoint**: `/api/orders/revenue`  
  - **Method**: `GET`  

---

## Project Setup ⚙️

### Prerequisites
1. **Node.js** (v16 or later)
2. **MongoDB** (locally or a cloud-based service like MongoDB Atlas)
3. **Package Manager**: npm or yarn

### Installation Steps
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/developerFarukk/By-Cycle-Store-Pro-Server.git
   cd bicycle-store-api

2. **Install Dependencies**  
   ```bash
   npm install

3. **Environment Setup**  
    Create a *.env* file in the root directory with the following keys:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string

4. **Start the Development Server**  
   ```bash
   npm run dev