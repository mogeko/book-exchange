# @mogeko/bookworm-db

## 0.9.3

### Patch Changes

- [#82](https://github.com/mogeko/bookworm/pull/82) [`8674cac`](https://github.com/mogeko/bookworm/commit/8674caca3f5fb4ee9ddf25bf8ae59a8d2339d8a2) Thanks [@mogeko](https://github.com/mogeko)! - `User.name` and `User.avatar` should be required.

## 0.9.2

### Patch Changes

- [#79](https://github.com/mogeko/bookworm/pull/79) [`17f2162`](https://github.com/mogeko/bookworm/commit/17f2162de75091a0a0414cdba7220bc5a9a4a429) Thanks [@mogeko](https://github.com/mogeko)! - Use a single password (`pa$w0rd`) for all seeded `User`s.

## 0.9.1

### Patch Changes

- [#73](https://github.com/mogeko/bookworm/pull/73) [`6e82f4a`](https://github.com/mogeko/bookworm/commit/6e82f4a5da7cb086e5e06077b9c82f401981b391) Thanks [@mogeko](https://github.com/mogeko)! - Use autoincrement int instead of CUID as `id`.

- [#73](https://github.com/mogeko/bookworm/pull/73) [`f9bfca5`](https://github.com/mogeko/bookworm/commit/f9bfca521e63a815ee3a2786234908ac8e59bdbb) Thanks [@mogeko](https://github.com/mogeko)! - Rename `Transcript` to `Score`.

## 0.9.0

### Minor Changes

- [#71](https://github.com/mogeko/bookworm/pull/71) [`7709b41`](https://github.com/mogeko/bookworm/commit/7709b4173bb33e7f93a59cf2a535ce821c9a6861) Thanks [@mogeko](https://github.com/mogeko)! - Change to implicit many-to-many (Hide `Author` and `Owner`).

- [#71](https://github.com/mogeko/bookworm/pull/71) [`e9b8258`](https://github.com/mogeko/bookworm/commit/e9b82586b1e85927abda4cfa42d5cd9be7aee20f) Thanks [@mogeko](https://github.com/mogeko)! - self relations `User` with implicit many-to-many.

### Patch Changes

- [#71](https://github.com/mogeko/bookworm/pull/71) [`7709b41`](https://github.com/mogeko/bookworm/commit/7709b4173bb33e7f93a59cf2a535ce821c9a6861) Thanks [@mogeko](https://github.com/mogeko)! - rename `Writer` to `Author`.

## 0.8.0

### Minor Changes

- [#67](https://github.com/mogeko/bookworm/pull/67) [`4ee1cdc`](https://github.com/mogeko/bookworm/commit/4ee1cdc559e610229afd9b25ec1e7ba4eaf5c57d) Thanks [@mogeko](https://github.com/mogeko)! - Add `Transcript` allows `User`s to rate `Book`s.

### Patch Changes

- [#67](https://github.com/mogeko/bookworm/pull/67) [`bbac5fe`](https://github.com/mogeko/bookworm/commit/bbac5fe62dec48a7074f0e100ad98131bbafcab3) Thanks [@mogeko](https://github.com/mogeko)! - Narrow the range of `score` on the `Transcript`.

## 0.7.0

### Minor Changes

- [#65](https://github.com/mogeko/bookworm/pull/65) [`5a68819`](https://github.com/mogeko/bookworm/commit/5a68819c576c157588166207eb1cf97a051f1944) Thanks [@mogeko](https://github.com/mogeko)! - Add `Voter` to store `likes/dislikes` for `Comment`.

  `Voter.vote` will be `true` for `like` and `false` for `dislike`.

## 0.6.0

### Minor Changes

- [#63](https://github.com/mogeko/bookworm/pull/63) [`1d75631`](https://github.com/mogeko/bookworm/commit/1d756310ba7b1178ab13b07fbf5047569c825c3a) Thanks [@mogeko](https://github.com/mogeko)! - Add `Comment` to store `User`'s comments.

### Patch Changes

- [#63](https://github.com/mogeko/bookworm/pull/63) [`3404b6c`](https://github.com/mogeko/bookworm/commit/3404b6c4919887340c7a2659fc8ca7431978653c) Thanks [@mogeko](https://github.com/mogeko)! - Deduplicate the keys before seeding `Somebody`.

- [#63](https://github.com/mogeko/bookworm/pull/63) [`ed47d1e`](https://github.com/mogeko/bookworm/commit/ed47d1e680131efe52659acbf57a541237588399) Thanks [@mogeko](https://github.com/mogeko)! - Run seeding script (`./prisma/seed.ts`) by [`vite-node`](https://www.npmjs.com/package/vite-node).

## 0.5.0

### Minor Changes

- [#61](https://github.com/mogeko/bookworm/pull/61) [`31a22f7`](https://github.com/mogeko/bookworm/commit/31a22f79525a4c88cce93bee31c276d6964bab78) Thanks [@mogeko](https://github.com/mogeko)! - Add `Somebody` to handle follow-up Between `User`s.

## 0.4.0

### Minor Changes

- [#59](https://github.com/mogeko/bookworm/pull/59) [`e5f56f5`](https://github.com/mogeko/bookworm/commit/e5f56f56f98c555c72e81e6c9450162d4eb01172) Thanks [@mogeko](https://github.com/mogeko)! - Add `Auth` for authentication, it is one-to-one with `User`.

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
