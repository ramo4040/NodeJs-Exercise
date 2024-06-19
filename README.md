<details>
  <summary><h3>SimpleCRM - Facturation en Ligne</h3></summary>
  <p>

**Overview**

SimpleCRM is a SaaS platform for online invoice management designed for businesses seeking a straightforward solution. The service offers a monthly subscription providing an all-in-one solution to simplify invoice management, accounting, and inventory control.

**Features**

* **Customer and Supplier Management:**
    * Creation of detailed company profiles (name, address, tax information, etc.)
    * Management of contact information
* **Product Management:**
    * Creation of product profiles with purchase and sale prices, margins, sizes, etc.
* **Inventory Management:**
    * Tracking of supplier replenishments
* **Invoicing:**
    * Creation of invoices with one or multiple products
    * Management of customer invoices
* **Order Management:**
    * Tracking of supplier orders
* **Other Features:**
    * Reporting and analysis
    * Integration with accounting software

**Business Rules**

* An invoice can contain one or more products.
* Each invoice is linked to a single customer.
* A product can be purchased from one or more suppliers.
* Each business can manage its invoices, customers, inventory, and suppliers.

**User Stories**

* As a sales manager, I want to manage the list of customers, invoices, and orders (read, add, delete, modify).

**Goals**

* Modeling and creation of the database.
* Development of an API to manage the business activities of subscribed clients.

**Technologies**

* **Web Server:** Node.js and Express
* **Database:** MySQL
* **ORM:** Prisma (recommended) or TypeORM

## Installation and Startup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `nodemon`.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT license. 


  </p>
</details>

<details>
  <summary><h3>JWT auth example</h3></summary>

  <p>

  # JWT Authentication Example

Create a Node.js application that allows users to register, log in, and authenticate using JWT. Implement APIs for registration, login, and accessing a protected route using a well-organized project structure.

## Project Structure

```
└── 📁jwt auth example
    └── 📁prisma
        └── schema.prisma
    └── 📁src
        └── 📁Config
            └── prisma.ts
        └── 📁Controllers
            └── AuthController.ts
        └── 📁Middleware
            └── AuthMiddleware.ts
        └── 📁Models
            └── UserModel.ts
        └── 📁Routes
            └── AuthRoutes.ts
        └── 📁Services
            └── AuthService.ts
            └── UserService.ts
        └── 📁Validation
            └── AuthValidator.ts
        └── app.ts
        └── server.ts
    └── .env
    └── .gitignore
    └── nodemon.json
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```

## Routes

### Register (/auth/register)

**Method:** POST

**Body:**

```json
{ 
  "email": "your-email",
  "password": "your-password" 
}
```

**Description:** Registers a new user by hashing the password and storing the user details.

### Login (/auth/login)

**Method:** POST

**Body:**

```json
{ 
  "email": "your-email",
  "password": "your-password" 
}
```

**Description:** Authenticates a user by verifying the password and generates a JWT if credentials are valid.

### Protected Route (/protected)

**Method:** GET

**Description:** Returns protected information if the JWT is valid.

    
  </p>
  
</details>
