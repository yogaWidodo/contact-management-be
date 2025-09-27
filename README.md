
# 📞 Contact Management API

A simple and robust RESTful API for managing contacts, built with Node.js and Express. This project provides a clean architecture for handling users, contacts, and addresses with a secure authentication system.

---

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/yogaWidodo/contact-management-be">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/yogaWidodo/contact-management-be">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/yogaWidodo/contact-management-be">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/yogaWidodo/contact-management-be">
</p>

---

## ✨ About The Project

This project is a backend service for a contact management application. It allows users to register, log in, and manage their personal contacts. Each contact can have multiple addresses.

**Core Features:**

*   **User Management:** Secure registration, login, and profile updates.
*   **Contact Management:** Full CRUD operations for contacts.
*   **Address Management:** Full CRUD operations for addresses associated with a contact.
*   **Authentication:** Token-based authentication for protected endpoints.
*   **Validation:** Robust request validation to ensure data integrity.

## 🛠️ Tech Stack

This project is built with modern and reliable technologies:

*   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
*   **Database:** [MySQL](https://www.mysql.com/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Validation:** [Joi](https://joi.dev/)
*   **Authentication:** [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing, [UUID](https://www.npmjs.com/package/uuid) for tokens
*   **Testing:** [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   A running MySQL database instance

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/yogaWidodo/contact-management-be.git
    cd contact-management-be
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your database connection string:
    ```env
    DATABASE_URL="mysql://user:password@host:port/database_name"
    ```

4.  **Run database migrations:**
    This will apply the database schema to your database.
    ```sh
    npx prisma migrate dev
    ```

5.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

##  API Documentation

Here are the details for all available API endpoints.

<details>
  <summary><h3>👤 User API</h3></summary>

  # User API Spec

  ## Register User API

  Endpoint :  POST /api/users

  Request Body :

  ```json
  {
    "username" : "pzn",
    "password" : "rahasia",
    "name" : "Programmer Zaman Now"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "username" : "pzn",
      "name" : "Programmer Zaman Now"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Username already registered"
  }
  ```

  ## Login User API

  Endpoint : POST /api/users/login

  Request Body :

  ```json
  {
    "username" : "pzn",
    "password" : "rahasia"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "token" : "unique-token"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Username or password wrong"
  }
  ```

  ## Update User API

  Endpoint : PATCH /api/users/current

  Headers :
  - Authorization : token

  Request Body :

  ```json
  {
    "name" : "Programmer Zaman Now Lagi", // optional
    "password" : "new password" // optional
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "username" : "pzn",
      "name" : "Programmer Zaman Now Lagi"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Name length max 100"
  }
  ```

  ## Get User API

  Endpoint : GET /api/users/current

  Headers :
  - Authorization : token

  Response Body Success:

  ```json
  {
    "data" : {
      "username" : "pzn",
      "name" : "Programmer Zaman Now"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Unauthorized"
  }
  ```

  ## Logout User API

  Endpoint : DELETE /api/users/logout

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : "OK"
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Unauthorized"
  }
  ```

</details>

<details>
  <summary><h3>👥 Contact API</h3></summary>

  # Contact API Spec

  ## Create Contact API

  Endpoint : POST /api/contacts

  Headers :
  - Authorization : token

  Request Body :

  ```json
  {
    "first_name" : "Eko",
    "last_name" : "Khannedy",
    "email" : "eko@pzn.com",
    "phone" : "32423423434"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "first_name" : "Eko",
      "last_name" : "Khannedy",
      "email" : "eko@pzn.com",
      "phone" : "32423423434"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Email is not valid format"
  }
  ```

  ## Update Contact API

  Endpoint : PUT /api/contacts/:id

  Headers :
  - Authorization : token

  Request Body :

  ```json
  {
    "first_name" : "Eko",
    "last_name" : "Khannedy",
    "email" : "eko@pzn.com",
    "phone" : "32423423434"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "first_name" : "Eko",
      "last_name" : "Khannedy",
      "email" : "eko@pzn.com",
      "phone" : "32423423434"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Email is not valid format"
  }
  ```

  ## Get Contact API

  Endpoint : GET /api/contacts/:id

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "first_name" : "Eko",
      "last_name" : "Khannedy",
      "email" : "eko@pzn.com",
      "phone" : "32423423434"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Contact is not found"
  }
  ```

  ## Search Contact API

  Endpoint : GET /api/contacts

  Headers :
  - Authorization : token

  Query params :
  - name : Search by first_name or last_name, using like, optional
  - email : Search by email using like, optional
  - phone : Search by phone using like, optional
  - page : number of page, default 1
  - size : size per page, default 10

  Response Body Success :

  ```json
  {
    "data" : [
      {
        "id" : 1,
        "first_name" : "Eko",
        "last_name" : "Khannedy",
        "email" : "eko@pzn.com",
        "phone" : "32423423434"
      },
      {
        "id" : 2,
        "first_name" : "Eko",
        "last_name" : "Khannedy",
        "email" : "eko@pzn.com",
        "phone" : "32423423434"
      }
    ],
    "paging" : {
      "page" : 1,
      "total_page" : 3,
      "total_item" : 30
    }
  }
  ```

  ## Remove Contact API

  Endpoint : DELETE /api/contacts/:id

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : "OK"
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Contact is not found"
  }
  ```

</details>

<details>
  <summary><h3>📍 Address API</h3></summary>

  # Address API Spec

  ## Create Address API

  Endpoint : POST /api/contacts/:contactId/addresses

  Headers :
  - Authorization : token

  Request Body :

  ```json
  {
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "street" : "Jalan apa",
      "city" : "Kota apa",
      "province" : "Provinsi apa",
      "country" : "Negara apa",
      "postal_code" : "Kode pos"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Country is required"
  }
  ```

  ## Update Address API

  Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

  Headers :
  - Authorization : token

  Request Body :

  ```json
  {
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
  }
  ```

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "street" : "Jalan apa",
      "city" : "Kota apa",
      "province" : "Provinsi apa",
      "country" : "Negara apa",
      "postal_code" : "Kode pos"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "Country is required"
  }
  ```

  ## Get Address API

  Endpoint : GET /api/contacts/:contactId/addresses/:addressId

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : {
      "id" : 1,
      "street" : "Jalan apa",
      "city" : "Kota apa",
      "province" : "Provinsi apa",
      "country" : "Negara apa",
      "postal_code" : "Kode pos"
    }
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "contact is not found"
  }
  ```

  ## List Addresses API

  Endpoint : GET /api/contacts/:contactId/addresses

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : [
      {
        "id" : 1,
        "street" : "Jalan apa",
        "city" : "Kota apa",
        "province" : "Provinsi apa",
        "country" : "Negara apa",
        "postal_code" : "Kode pos"
      },
      {
        "id" : 1,
        "street" : "Jalan apa",
        "city" : "Kota apa",
        "province" : "Provinsi apa",
        "country" : "Negara apa",
        "postal_code" : "Kode pos"
      }
    ]
  }
  ```

  ## Remove Address API

  Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

  Headers :
  - Authorization : token

  Response Body Success :

  ```json
  {
    "data" : "OK"
  }
  ```

  Response Body Error :

  ```json
  {
    "errors" : "address is not found"
  }
  ```

</details>

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving this project, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

See [contributors](https://github.com/yogaWidodo/contact-management-be/graphs/contributors) for a list of active contributors.

## 📜 License

Distributed under the ISC License. See `LICENSE` for more information.

---
