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

* As a sales manager, I want to manage the list of customers, suppliers, invoices, and orders (read, add, delete, modify).

**Goals**

* Modeling and creation of the database.
* Development of an API to manage the business activities of subscribed clients.

**Technologies**

* **Web Server:** Node.js and Express
* **Database:** MySQL
* **ORM:** Prisma (recommended) or TypeORM

**Project Structure**

The project is structured in several modules:

* **Data Model:** Defines the structure of the database and the relationships between different entities.
* **API:** Provides endpoints to access data and service functionalities.
* **User Interface (optional):** Web interface allowing users to interact with the service.

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
