# @mogeko/bookworm-db

This is the database package. It is responsible for the database connection and the schema definition.

## PostgreSQL

We need make sure that we have a [PostgreSQL](https://www.postgresql.org) database running on our machine.

It is a good idea to run it by using [Docker](https://www.docker.com) or [Docker Compose](https://docs.docker.com/compose).

```bash
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=prisma \
  -v postgresql-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres
```

## Prisma

We use [Prisma](https://www.prisma.io) as an ORM. It allows us to define our schema in a declarative way and generate the database client for us.

**The generated client will be exported** from this package and used in the other packages of the monorepo.

### Connection URL

Prisma is based on the [official PostgreSQL format](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) for connection URLs. It should look like this:

![postgresql](https://www.prisma.io/docs/static/13ad9000b9d57ac66c16fabcad9e08b7/42cbc/postgresql-connection-string.png)

```txt
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?KEY1=VALUE&KEY2=VALUE
```

We can use the `POSTGRES_PRISMA_URL` or `POSTGRES_URL_NON_POOLING` environment variable to set the connection URL.

To do that, we should edit the `.env` file (if not exists, create it) in the root of this package.

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

POSTGRES_PRISMA_URL="postgresql://postgres:password@localhost:5432/prisma?schema=public&connect_timeout=10&pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://postgres:password@localhost:5432/prisma?schema=public"
```

### Default connection parameters

When you connect with Prisma using the `POSTGRES_PRISMA_URL` environment variable, the parameters `connect_timeout=10` and `pgbouncer=true` will be set.

We recommend using the `POSTGRES_URL_NON_POOLING` Environment Variable instead.

See the [Prisma docs](https://www.prisma.io/docs/concepts/database-connectors/postgresql) to learn more.

### Prisma Migrate

To use [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate), you must connect to Vercel Postgres with the `POSTGRES_URL_NON_POOLING` environment variable. Prisma migrations do not work with pooled connections. This environment variable can also be added to your client through the `directUrl` configuration property in your `schema.prisma` file.

## Entity Relationship Diagrams

```mermaid
erDiagram
  AUTH |o--|| USER : authorize
  AUTH {
    UUID     id        PK
    DataTime loginTime
    String   userEmail FK, UK
    String   password
  }
  USER ||--o{ OWNER    : is
  USER ||--o{ SOMEBODY : "follow with"
  USER ||--o{ COMMENT  : issue
  USER ||--o{ VOTER    : is
  USER {
    UUID     id        PK
    DataTime createdAt
    DataTime updatedAt
    String   email     UK
    String   name
    String   avatar
  }
  OWNER }o--|| BOOK : own
  OWNER {
    UUID     userId    PK, FK
    UUID     bookId    PK, FK
    DataTime createdAt
  }
  SOMEBODY }o--|| USER : "be followed"
  SOMEBODY {
    UUID     followeeId PK, FK
    UUID     followedId PK, FK
    DataTime createdAt
  }
  VOTER }o--|| COMMENT : "like/dislike"
  VOTER {
    UUID     voterId   PK, FK
    UUID     commentId PK, FK
    DataTime createdAt
    DataTime updatedAt
    Boolean  vote
  }
  COMMENT ||--o| TRANSCRIPT : attach
  COMMENT }o--o| USER       : "to"
  COMMENT }o--o| PUBLISHER  : "to"
  COMMENT }o--o| WRITER     : "to"
  COMMENT }o--o| SERIES     : "to"
  COMMENT {
    UUID     id            PK
    UUID     commentatorId FK
    UUID     userId        FK
    UUID     publisherId   FK
    UUID     seriesId      FK
    UUID     writerId      FK
    DataTime createdAt
    DataTime updatedAt
    String   content
  }
  TRANSCRIPT }o--|| BOOK : "to"
  TRANSCRIPT {
    UUID     commentatorId PK, FK
    UUID     bookId        PK, FK
    DataTime createdAt
    DataTime updatedAt
    Number   score
  }
  PUBLISHER ||--o{ BOOK : publish
  PUBLISHER {
    UUID   id   PK
    String name
  }
  WRITER ||--o{ AUTHOR : is
  WRITER {
    UUID   id   PK
    String name
  }
  AUTHOR }o--|| BOOK : write
  AUTHOR {
    UUID writeId PK, FK
    UUID bookId  PK, FK
  }
  SERIES ||--o{ BOOK : has
  SERIES {
    UUID     id          PK
    DataTime createdAt
    DataTime updatedAt
    String   name        UK
    String   discription
    String   cover
  }
  BOOK {
    UUID     id          PK
    UUID     publisherId FK
    UUID     seriesId    FK
    DataTime createdAt
    DataTime updatedAt
    String   title
    String   discription
    String   isbn        UK
    String   cover
  }
```

## License

The code in this project is released under the [MIT License](./LICENSE).
