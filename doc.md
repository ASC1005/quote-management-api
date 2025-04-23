# Why I Built the Quote Management API This Way

As the developer, I made each technology and design decision in this project with maintainability, scalability, and security in mind. Here’s a detailed breakdown of my reasoning:

---

## 1. **Project Structure & Patterns**

**MVC Pattern:**  
I organized the codebase using the Model-View-Controller (MVC) pattern. This keeps business logic (controllers), data schemas (models), and routing (routes) separate, making the code easier to maintain and extend.  
- **models/**: All MongoDB schemas (User, Product, Quote) are here.
- **controllers/**: Business logic for each resource.
- **routes/**: API endpoint definitions, grouped by resource.
- **middlewares/**: For authentication, error handling, etc.
- **utils/**: Shared helpers (error formatting, async handler, email sending).

**Why?**  
This separation of concerns makes it easy to add new features, onboard new developers, and debug issues.

---

## 2. **Technology Choices**

### **Node.js & Express**
- **Why?**  
  Node.js is fast and handles concurrent requests well, which is important for APIs. Express is minimal but powerful, with a huge ecosystem and middleware support.

### **MongoDB & Mongoose**
- **Why?**  
  MongoDB’s flexible schema is ideal for evolving business requirements (quotes and products can change structure over time). Mongoose adds schema validation, relationships, and easy querying.

### **JWT Authentication**
- **Why?**  
  JWTs allow for stateless authentication, which scales better than session-based auth. Using both access and refresh tokens increases security and allows for short-lived access tokens without hurting user experience.

### **bcrypt**
- **Why?**  
  Passwords are hashed with bcrypt before storage, following security best practices to protect user data.

### **Nodemailer**
- **Why?**  
  Many businesses want email notifications for quotes. Nodemailer is reliable and easy to configure for SMTP providers.

### **dotenv**
- **Why?**  
  Keeps sensitive configuration (like DB URIs and secrets) out of the codebase, supporting different environments (dev, test, prod).

---

## 3. **Testing**

### **Jest & Supertest**
- **Why?**  
  Automated tests catch bugs early and document expected behavior. Jest is fast and widely used; Supertest makes it easy to test HTTP endpoints.

### **Test Structure**
- Tests are in `__tests__/` and cover user registration/login, quote creation, and product management.
- Each test suite cleans up the database before running to ensure isolation and reliability.

---

## 4. **Error Handling**

- **Centralized Error Handling:**  
  All errors are caught and formatted consistently using a custom `ApiError` class and a global error middleware. This makes debugging easier and ensures clients always get a predictable error response.

- **Async Handler:**  
  All async controllers are wrapped to catch errors without repetitive try/catch blocks.

---

## 5. **Security**

- **Environment Variables:**  
  All secrets and sensitive config are loaded from `.env` files, never hardcoded.
- **CORS:**  
  Configured to allow only trusted origins, preventing unauthorized cross-origin requests.
- **Token Storage:**  
  Refresh tokens are stored securely (e.g., in httpOnly cookies).
- **Input Validation:**  
  Controllers check for required fields and valid data before processing requests.

---

## 6. **CI/CD Pipeline**

- **GitHub Actions:**  
  I set up a workflow to automatically install dependencies, spin up a MongoDB instance, create a test `.env`, and run all tests on every push or pull request. This ensures code quality and prevents regressions.
- **Why?**  
  Automated pipelines save time, catch issues before deployment, and enforce a standard of quality.

---

## 7. **Extensibility & Maintainability**

- **API Versioning:**  
  All routes are prefixed with `/api/v1/`, so future versions can be added without breaking existing clients.
- **Modular Design:**  
  Adding new features (like new resources or endpoints) follows a clear, repeatable pattern.
- **Email Logic:**  
  Abstracted into utility functions, so it’s easy to swap providers or change templates.

---

## Summary

Every choice in this repo is intentional:
- **Express & Node.js** for speed and flexibility.
- **MongoDB & Mongoose** for schema flexibility and rapid iteration.
- **JWT & bcrypt** for secure, scalable authentication.
- **Jest & Supertest** for reliable, automated testing.
- **CI/CD** for continuous quality.
- **MVC & modularity** for maintainability and extensibility.

This approach ensures the API is secure, reliable, and easy to evolve as business needs change.