# PartnerLeads Project

## 🚀 Getting Started

Follow these steps to run the project using Docker Compose.

### 📋 Prerequisites

Make sure you have the following installed:

- 🐳 [Docker](https://www.docker.com/get-started)
- 🐙 [Docker Compose](https://docs.docker.com/compose/install/)

### 🛠️ Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/partnerleads.git
   cd partnerleads
   ```
2. **Create a .env file**

   Create a .env file in the root directory with the your content content:

```bash
   DATABASE_URL= -
   DATABASE_NAME= -
   DATABASE_DIALECT= -
   DATABASE_HOST= -
   DATABASE_USER= -
   DATABASE_PASSWORD= -
   DATABASE_PORT= -
   COOKIE_SECRET=6JsJu7zOG1nMXXVO5JvKzhOW1wFH3KYb
   PORT=3000
```

3. **Build and run the containers:**

   ```bash
      docker compose up --build
   ```

🧹 Cleanup

```bash
   docker compose down
```

4. **Create an primary user that allows you to access the admin for the first time:**

```bash
psql -h localhost -U postgres -d test-partnerleads -c "INSERT INTO public.\"user\" (name, email, password, role, created_at) VALUES ('userTest', 'test@test.com', 'password', 'Administrador', NOW());"
```

5. **Login with the user created**
