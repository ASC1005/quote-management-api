# Quote Management API

A secure, scalable, and maintainable RESTful API for managing users, products, and quotes. Built with Node.js, Express, MongoDB, and tested with Jest.

---

## Why This Stack and Structure?

- **Node.js & Express:** Fast, non-blocking, and widely adopted for REST APIs. Express provides a clean middleware system and routing.
- **MongoDB & Mongoose:** Flexible NoSQL database, ideal for evolving data models. Mongoose adds schema validation and easy data relationships.
- **JWT Authentication:** Secure, stateless user sessions with access and refresh tokens.
- **Nodemailer:** For sending quote request notifications via email.
- **Jest & Supertest:** Automated testing for reliability and confidence in code changes.
- **dotenv:** Keeps sensitive configuration out of code and supports multiple environments.
- **MVC Pattern:** Clear separation of concerns for maintainability and scalability.

---

## Features

- **User Management:** Register, login, logout, profile, and token refresh.
- **Product Management:** Create and list products.
- **Quote Management:** Create, update, delete, fetch, and request quotes.
- **Email Notifications:** Admin notified when a quote is requested.
- **Authentication & Authorization:** JWT-based, with secure cookies.
- **Robust Error Handling:** Centralized and consistent error responses.
- **API Versioning:** All endpoints are under `/api/v1/` for future-proofing.
- **Health Check Endpoint:** `/api/v1/is-healthy` for uptime monitoring.
- **Automated Testing:** Coverage for all major flows.
- **CI/CD:** GitHub Actions pipeline for automated testing.

---

## Project Structure

```
.
├── app.js                # Express app setup
├── index.js              # Entry point, DB connection
├── constants.js          # App-wide constants
├── db/                   # Database connection logic
├── controllers/          # Business logic for each resource
├── models/               # Mongoose schemas
├── routes/               # API endpoint definitions
├── middlewares/          # Auth, error handling, etc.
├── utils/                # Helpers (email, error, response, async handler)
├── __tests__/            # Jest/Supertest integration tests
├── .github/workflows/    # CI/CD pipeline
├── .env.example          # Example environment variables
├── package.json
└── Quote API.postman_collection.json # Postman collection for API testing
```

---

## Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/yourusername/quote-management-api.git
cd quote-management-api
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```sh
cp .env.example .env
```

### 4. Run the app

```sh
npm run dev
```

### 5. Run tests

```sh
npm test
```

---

## API Documentation

- Import [`Quote API.postman_collection.json`](Quote%20API.postman_collection.json) into Postman for ready-to-use requests.
- All endpoints are prefixed with `/api/v1/`.

---

## CI/CD

- Automated tests run on every push and pull request to `master` via [GitHub Actions](.github/workflows/ci.yml).

---

## Security & Best Practices

- Passwords are hashed with bcrypt.
- JWT tokens are used for authentication.
- Sensitive config is stored in environment variables.
- CORS and cookie security are enabled.
- Centralized error handling for consistent API responses.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## License

ISC