# Database

This is the database package. It is responsible for the database connection and the schema definition.

We use [Prisma](https://www.prisma.io) as an ORM. It is a very powerful tool that allows us to define our schema in a declarative way and generate the database client for us. The generated client will be exported from this package and used in the other packages of the monorepo.

## Entity Relationship Diagrams

```mermaid
erDiagram
  AUTH ||--|| USER : authorize
  AUTH {
    UUID     id        PK
    UUID     userId    FK
    DataTime loginTime
    Hash     password
  }
  USER ||--o{ OWNER : is
  USER ||--o{ SOMEBODY : follow
  USER ||--o{ COMMENT : issue
  USER ||--o{ VOTER : is
  USER ||--o{ GRADER : is
  USER {
    UUID      id        PK
    UUID      authId    FK
    DataTime  createdAt
    DataTime  updatedAt
    String    email     UK
    String    name
    String    avatar
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
  GRADER }o--|| BOOK : grading
  GRADER {
    UUID     userId   PK, FK
    UUID     bookId   PK, FK
    DataTime createdAt
    DataTime updatedAt
    Number   score
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
    UUID      userId   PK, FK
    UUID      targetId PK, FK
    DataTime  createdAt
    DataTime  updatedAt
    String    content
  }
  PUBLISHER ||--o{ BOOK : publish
  PUBLISHER {
    UUID      id           PK
    String    name
  }
  WRITER ||--o{ AUTHOR : is
  WRITER {
    UUID      id       PK
    String    name
  }
  AUTHOR }o--|| BOOK : write
  AUTHOR {
    UUID writeId PK, FK
    UUID bookId  PK, FK
  }
  SERIE ||--o{ BOOK : has
  SERIE {
    UUID      id       PK
    String    name
  }
  BOOK {
    UUID      id          PK
    UUID      publisherId FK
    UUID      serieId     FK
    DataTime  createdAt
    DataTime  updatedAt
    String    title
    String    discription
    String    cover
    String    isbn
  }
```

## License

The code in this project is released under the [MIT License](./LICENSE).
