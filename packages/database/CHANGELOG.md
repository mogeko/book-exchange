# @mogeko/bookworm-db

## 0.3.0

### Minor Changes

- [#57](https://github.com/mogeko/bookworm/pull/57) [`c287936`](https://github.com/mogeko/bookworm/commit/c287936626402c958bc2aefef43196992e828884) Thanks [@mogeko](https://github.com/mogeko)! - Add `Publisher` and `Series`.

### Patch Changes

- [#57](https://github.com/mogeko/bookworm/pull/57) [`771ee76`](https://github.com/mogeko/bookworm/commit/771ee76900bd2d7494fd465ea9f86a908335e91d) Thanks [@mogeko](https://github.com/mogeko)! - Make sure that `Series.name` is unique.

## 0.2.0

### Minor Changes

- [#55](https://github.com/mogeko/bookworm/pull/55) [`4967474`](https://github.com/mogeko/bookworm/commit/49674740bd20673a3bcef2b106b42b121aeded82) Thanks [@mogeko](https://github.com/mogeko)! - Add `Writer`, It is a many-to-many model for `Book`.

### Patch Changes

- [#55](https://github.com/mogeko/bookworm/pull/55) [`a5eb43a`](https://github.com/mogeko/bookworm/commit/a5eb43a5c23cecdb0a304b838a32b144b43e5535) Thanks [@mogeko](https://github.com/mogeko)! - Use `CUID` instead of `UUID` as `id`.

## 0.1.0

### Minor Changes

- [#53](https://github.com/mogeko/bookworm/pull/53) [`fc4f030`](https://github.com/mogeko/bookworm/commit/fc4f030eb1fd550cfb38ee41e7c69e5032cf59b7) Thanks [@mogeko](https://github.com/mogeko)! - Migrate the relationship between `User` and `Book` to many-to-many.

## 0.0.2

### Patch Changes

- [#51](https://github.com/mogeko/bookworm/pull/51) [`5adcdcd`](https://github.com/mogeko/bookworm/commit/5adcdcda2481cf155e349c7c29d781da7f1dc179) Thanks [@mogeko](https://github.com/mogeko)! - Draw the Entity Relationship Diagrams with [mermaid](https://mermaid.js.org).

## 0.0.1

### Patch Changes

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Setup [Prisma](https://www.prisma.io) as ORM for [PostgreSQL](https://www.postgresql.org).

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Initialize [Schema](https://www.prisma.io/docs/concepts/components/prisma-schema) and [Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate).
