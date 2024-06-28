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


<details>
  <summary><h3>Restaurant Management API</h3></summary>

  <p>


# Restoran Chain Website Backend

This repository contains the backend code for the Restoran chain website, designed to improve the chain's marketing strategy and provide customers with an easy way to view meals, book tables, and learn more about the restaurant.

## Technologies Used

The backend is built using Node.js and Express, with a MySQL database and Prisma ORM. The template engine used is Ejs, and Nodemailer is used for sending emails, along with an email marketing service.

## Features

The backend includes the following features:

- Model and creation of the database
- Creation of necessary endpoints (Home, About, Contact, Meals, Send Email, Add Meal)
- Dynamic sections: meals, teams, restaurant coordinates of the Home page
- Sending a thank-you email to new newsletter subscribers
- Recording all necessary information about incoming requests in a text file

## Business Rules

The following business rules are implemented in the backend:

- A meal can have only one category
- A restaurant can employ one or more employees
- A restaurant can serve one or more meals
- The restaurant offers its customers the opportunity to subscribe to its newsletter

## Routes 


| Method | Path | Description | Request Body | Response | Authentication |
|---|---|---|---|---|---|
| GET | `/` | Retrieves information for the home page (featured meals, team members, restaurant details) | N/A | JSON object containing home page data | N/A |
| GET | `/about` | Retrieves content for the "About Us" page | N/A | JSON object containing About content | N/A |
| GET | `/contact` | Retrieves content for the "contact Us" page | N/A | JSON object containing Contact content | N/A |
| POST | `/contact` | Handles submissions from the contact form | JSON object containing name, email, and message | Success message (200 OK) or error message (400 Bad Request) | N/A |
| POST | `/newsletter` | Handles newsletter subscription requests | JSON object containing email | Confirmation message (201 Created) or error message (400 Bad Request) | N/A |
| POST | `/admin/meals` | (Bonus) Handles submissions for adding new meals | JSON object containing meal details | Confirmation message (201 Created), error message (400 Bad Request), or 401 Unauthorized | Admin authentication required |
| POST | `/admin/employees` | (Bonus) Handles submissions for adding new employees | JSON object containing employee details | Confirmation message (201 Created), error message (400 Bad Request), or 401 Unauthorized | Admin authentication required |


## Bonus Features

The following bonus features are also included:

- CSRF protection
- Table reservation
- Form to add meals
- Form to add employees
- Customization of the site to adapt it to each restaurant

## Installation

To install the backend, follow these steps:

1. Clone the repository
2. Install the dependencies using `npm install`
3. Set up the MySQL database and update the `.env` file with the database credentials
4. Run the Prisma migrations using `npx prisma migrate dev`
5. Start the server using `npm start`

## Contributing

Contributions are welcome! Please submit a pull request with any proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).


    
  </p>
</details>
