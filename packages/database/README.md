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
    Int    id        PK
    String userEmail FK, UK
    String password
  }
  USER ||--o| PROFILE     : has
  USER ||--o{ OWNER       : is
  USER ||--o{ BOOKLIST    : create
  USER ||--o{ SOMEBODY    : "follow with"
  USER ||--o{ COMMENT     : issue
  USER ||--o{ VOTER       : is
  USER ||--o{ REFERRAL    : be
  USER {
    Int      id        PK
    DataTime createdAt
    DataTime updatedAt
    String   email     UK
    String   name
    String   avatar
  }
  PROFILE {
    Int      id       PK
    Int      userId   FK
    DateTime birthday
    String   bio
    String   location
    String[] urls
  }
  OWNER }o--|| BOOK : own
  OWNER {
    Int userId PK, FK
    Int bookId PK, FK
  }
  BOOKLIST ||--o{ BOOKLIST_BOOK : via
  BOOKLIST {
    Int    id     PK
    Int    userId FK
    String title
    String discription
    String status
    String priority
  }
  REFERRAL ||--o{ REFERRAL_BOOK : via
  REFERRAL {
    Int      id        PK
    Int      userId    FK
    DataTime createdAt
  }
  BOOKLIST_BOOK }o--|| BOOK : has
  BOOKLIST_BOOK {
    Int booklistId PK, FK
    Int bookId     PK, FK
  }
  REFERRAL_BOOK }o--|| BOOK : has
  REFERRAL_BOOK {
    Int referralId PK, FK
    Int bookId     PK, FK
  }
  SOMEBODY }o--|| USER : "be followed"
  SOMEBODY {
    Int followeeId PK, FK
    Int followedId PK, FK
  }
  VOTER }o--|| COMMENT : "like/dislike"
  VOTER {
    Int      voterId   PK, FK
    Int      commentId PK, FK
    DataTime createdAt
    DataTime updatedAt
    Boolean  vote
  }
  COMMENT ||--o| SCORE      : attach
  COMMENT }o--o| USER       : "to"
  COMMENT }o--o| PUBLISHER  : "to"
  COMMENT }o--o| AUTHOR     : "to"
  COMMENT }o--o| SERIES     : "to"
  COMMENT {
    Int      id            PK
    Int      commentatorId FK
    Int      userId        FK
    Int      publisherId   FK
    Int      seriesId      FK
    Int      authorId      FK
    DataTime createdAt
    DataTime updatedAt
    String   content
  }
  SCORE }o--|| BOOK : "to"
  SCORE {
    Int commentId PK, FK
    Int bookId    PK, FK
    Int rate
  }
  SERIES ||--o{ BOOK : has
  SERIES {
    Int      id          PK
    Int      publisherId FK
    String   name
    String   discription
    String   cover
  }
  PUBLISHER ||--o{ BOOK   : publish
  PUBLISHER ||--o{ SERIES : publish
  PUBLISHER {
    Int    id   PK
    String name
  }
  AUTHOR ||--o{ WRITER     : is
  AUTHOR ||--o{ TRANSLATOR : is
  AUTHOR {
    Int    id   PK
    String name
  }
  WRITER }o--|| BOOK : write
  WRITER {
    Int writeId PK, FK
    Int bookId  PK, FK
  }
  TRANSLATOR }o--|| BOOK : translate
  TRANSLATOR {
    Int translatorId PK, FK
    Int bookId       PK, FK
  }
  BOOK }o--|| BOOK_TAG : has
  BOOK {
    Int      id          PK
    Int      publisherId FK
    Int      seriesId    FK
    DataTime createdAt
    DataTime updatedAt
    String   title
    String   discription
    String   isbn        UK
    String   cover
  }
  BOOK_TAG ||--o{ TAG : has
  BOOK_TAG {
    Int bookId PK, FK
    Int tagId  PK, FK
  }
  TAG {
    Int    id   PK
    String name UK
  }
```

## License

The code in this project is released under the [MIT License](./LICENSE).
