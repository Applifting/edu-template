# Database Configuration

This application supports both SQLite and PostgreSQL databases. By default, it uses SQLite for simplicity, but can be configured to use PostgreSQL for production environments.

## Default Configuration

By default, the application uses SQLite with the database file stored at `./dev.db`. This doesn't require any additional setup and the database file will be created automatically when you first run the application.

## Switching Between Database Providers

### Option 1: Using the script (Recommended)

We provide a script to easily switch between database providers:

```bash
# Switch to PostgreSQL
yarn switch-db -- postgresql

# Switch to SQLite
yarn switch-db -- sqlite
```

This will update the `prisma/schema.prisma` file with the appropriate provider.

### Option 2: Manual Configuration

You can manually edit the `prisma/schema.prisma` file and change the datasource provider:

For SQLite:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

For PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Setting the Database URL

You need to set the appropriate `DATABASE_URL` environment variable:

- For SQLite: `DATABASE_URL="file:./dev.db"` (or any file path)
- For PostgreSQL: `DATABASE_URL="postgresql://username:password@host:port/database?schema=public"`

### Environment File (.env)

Create a `.env` file in the `backend` directory with the appropriate configuration:

```env
# For SQLite
DATABASE_URL=file:./dev.db

# For PostgreSQL
# DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb?schema=public
```

### Docker Compose

If using Docker Compose, update the environment variables in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=development
  - DATABASE_URL=file:./dev.db # For SQLite
  # - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/db?schema=public  # For PostgreSQL
```

## Generating Prisma Client

After changing the database provider, you need to regenerate the Prisma client:

```bash
npx prisma generate
```

## Migrations

When switching between database providers, you may need to run migrations:

```bash
# For development
npx prisma migrate dev

# For production
npx prisma migrate deploy
```

## Notes on SQLite vs PostgreSQL

- SQLite is file-based and doesn't require a separate server, making it ideal for development and testing
- PostgreSQL is more powerful for production use cases with multiple concurrent users
- Some advanced features available in PostgreSQL may not be available in SQLite
- Always test your application with the database provider you plan to use in production
