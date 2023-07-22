# Database

This is the database package. It is responsible for the database connection and the schema definition.

We use [Prisma](https://www.prisma.io) as an ORM. It is a very powerful tool that allows us to define our schema in a declarative way and generate the database client for us. The generated client will be exported from this package and used in the other packages of the monorepo.

## Entity Relationship Diagrams

```mermaid
erDiagram
  AUTH ||--|| USER : authorize
  AUTH {
    UUID         id       PK
    Hash(sha512) password
    String       email
    User         user
    UUID         userId   FK
  }
  USER }|--o{ OWNER : is
  USER {
    UUID     id        PK
    String   email
    String   name
    DataTime createdAt
    DataTime updatedAt
    String   avatar
    Book[]   books
    Auth     auth
    UUID     authId    FK
  }
  BOOK }|--o{ OWNER : has
  BOOK {
    UUID      id          PK
    String    title
    String    discription
    DataTime  createdAt
    DataTime  updatedAt
    String    cover
    String    isbn
    Author[]  authors
    User[]    oweners
    Publisher publisher
    UUID      publisherId FK
    Serie     serie
    UUID      serieId     FK
  }
  OWNER {
    UUID     userId    PK, FK
    UUID     bookId    PK, FK
    DataTime createdAt
  }
  WRITER }o--o{ AUTHOR : is
  WRITER {
    UUID   id       PK
    String name
    Book[] artworks
  }
  BOOK }o--o{ AUTHOR : write
  AUTHOR {
    UUID writeId PK, FK
    UUID bookId  PK, FK
  }
  PUBLISHER }o--o| BOOK : publish
  PUBLISHER {
    UUID   id           PK
    String name
    Book[] publications
  }
  SERIE }o--o| BOOK : has
  SERIE {
    UUID   id    PK
    String name
    Book[] books
  }
```
