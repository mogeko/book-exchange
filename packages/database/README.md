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
  USER ||--o{ OWNER : is
  USER ||--o{ SOMEBODY : follow
  USER ||--o{ COMMENT : issue
  USER ||--o{ VOTER : is
  USER {
    UUID      id        PK
    String    email
    String    name
    DataTime  createdAt
    DataTime  updatedAt
    String    avatar
    Auth      auth
    UUID      authId    FK
    Book[]    books
    Comment[] commented
    Comment[] comments
    USER[]    following
    USER[]    followed
  }
  OWNER }o--|| BOOK : has
  OWNER {
    UUID     userId    PK, FK
    UUID     bookId    PK, FK
    DataTime createdAt
  }
  SOMEBODY }o--|| USER : follow
  SOMEBODY {
    UUID     followerId PK, FK
    UUID     followedId PK, FK
    DataTime createdAt
  }
  VOTER }o--|| COMMENT : vote
  VOTER {
    UUID      userId    PK, FK
    UUID      commentId PK, FK
    DataTime  createdAt
    DataTime  updatedAt
    Boolean   vote
  }
  COMMENT }o--|| BOOK : judge
  COMMENT }o--|| USER : judge
  COMMENT }o--|| PUBLISHER : judge
  COMMENT }o--|| WRITER : judge
  COMMENT }o--|| SERIE : judge
  COMMENT {
    UUID     userId   PK, FK
    UUID     targetId PK, FK
    String   content
    DataTime createdAt
    DataTime  updatedAt
  }
  PUBLISHER ||--o{ BOOK : publish
  PUBLISHER {
    UUID      id           PK
    String    name
    Comment[] comments
    Book[]    publications
  }
  WRITER ||--o{ AUTHOR : is
  WRITER {
    UUID      id       PK
    String    name
    Comment[] comments
    Book[]    artworks
  }
  AUTHOR }o--|| BOOK : write
  AUTHOR {
    UUID writeId PK, FK
    UUID bookId  PK, FK
  }
  SERIE ||--o{ BOOK : has
  SERIE {
    UUID      id    PK
    String    name
    Comment[] comments
    Book[]    books
  }
  BOOK {
    UUID      id          PK
    String    title
    String    discription
    DataTime  createdAt
    DataTime  updatedAt
    String    cover
    String    isbn
    Publisher publisher
    UUID      publisherId FK
    Serie     serie
    UUID      serieId     FK
    COMMENT[] comments
    Author[]  authors
    User[]    oweners
  }
```
