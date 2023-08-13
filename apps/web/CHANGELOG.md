# @mogeko/bookworm-web

## 0.8.2

### Patch Changes

- [#116](https://github.com/mogeko/bookworm/pull/116) [`46b45e1`](https://github.com/mogeko/bookworm/commit/46b45e193cafeabf7bb3e28d86f9b863d9270258) Thanks [@mogeko](https://github.com/mogeko)! - Implement `ThemeProvider` by ourself.

- [#116](https://github.com/mogeko/bookworm/pull/116) [`2322363`](https://github.com/mogeko/bookworm/commit/232236301fa3e813318027488dd3d9fd4c59be88) Thanks [@mogeko](https://github.com/mogeko)! - Add more themes.

- [#116](https://github.com/mogeko/bookworm/pull/116) [`63aa38c`](https://github.com/mogeko/bookworm/commit/63aa38c852f9f773477656e6fb8114eb9d7da7fa) Thanks [@mogeko](https://github.com/mogeko)! - Allow users to customize the theme color.

## 0.8.1

### Patch Changes

- [#114](https://github.com/mogeko/bookworm/pull/114) [`a902a08`](https://github.com/mogeko/bookworm/commit/a902a08acd93a8ab96e843e4f5a1001ddd273187) Thanks [@mogeko](https://github.com/mogeko)! - Confirm user's password when registering.

- [#114](https://github.com/mogeko/bookworm/pull/114) [`e62dc7d`](https://github.com/mogeko/bookworm/commit/e62dc7d78aa9296a854cdd42974668926451f88b) Thanks [@mogeko](https://github.com/mogeko)! - Create a settings page to change the password.

## 0.8.0

### Minor Changes

- [#112](https://github.com/mogeko/bookworm/pull/112) [`ca705cb`](https://github.com/mogeko/bookworm/commit/ca705cb723be1a978aad3e11a76788f2fbb863b8) Thanks [@mogeko](https://github.com/mogeko)! - Complete the UI part of the Account settings page.

- [#112](https://github.com/mogeko/bookworm/pull/112) [`b736acd`](https://github.com/mogeko/bookworm/commit/b736acd586b2d381480ae9f52a068d1c29b72c5c) Thanks [@mogeko](https://github.com/mogeko)! - Set the color theme in the setting page.

- [#112](https://github.com/mogeko/bookworm/pull/112) [`5456905`](https://github.com/mogeko/bookworm/commit/5456905a480b3fd72708edc148f8f5874f3e1c7e) Thanks [@mogeko](https://github.com/mogeko)! - Complete the UI part of the Profile settings page.

- [#112](https://github.com/mogeko/bookworm/pull/112) [`acf3681`](https://github.com/mogeko/bookworm/commit/acf3681aa23cf0be0c488bdb9566f5c38710ef71) Thanks [@mogeko](https://github.com/mogeko)! - Update Account settings by Server Action.

- [#112](https://github.com/mogeko/bookworm/pull/112) [`f453fa2`](https://github.com/mogeko/bookworm/commit/f453fa235396ea5c39d30d28ff3a60a75959f86e) Thanks [@mogeko](https://github.com/mogeko)! - Create a basic skeleton for the setup page.

- [#112](https://github.com/mogeko/bookworm/pull/112) [`4ba00b8`](https://github.com/mogeko/bookworm/commit/4ba00b86dac9adcc9f5a803f6c06c1843f6bfac7) Thanks [@mogeko](https://github.com/mogeko)! - Update Profile settings by Server Action.

### Patch Changes

- Updated dependencies [[`41b2acd`](https://github.com/mogeko/bookworm/commit/41b2acd7a852406181e8e972312ac0a43750f0dc)]:
  - @mogeko/bookworm-db@0.11.0

## 0.7.2

### Patch Changes

- [#110](https://github.com/mogeko/bookworm/pull/110) [`611ddc2`](https://github.com/mogeko/bookworm/commit/611ddc2a238b347c18896e1dcc7c874b214166fe) Thanks [@mogeko](https://github.com/mogeko)! - Search is allowed to be used, even if the user is not logged in.

  The search history from the unauthenticated user will be keep after the user login.

- [#110](https://github.com/mogeko/bookworm/pull/110) [`42ec769`](https://github.com/mogeko/bookworm/commit/42ec769a4fc3fc9715732ff0006691ddb1cc4836) Thanks [@mogeko](https://github.com/mogeko)! - Redesign the style of UserNav when not logged in.

- [#110](https://github.com/mogeko/bookworm/pull/110) [`000645d`](https://github.com/mogeko/bookworm/commit/000645d2dbacb1b906303bfddf3951a12d538177) Thanks [@mogeko](https://github.com/mogeko)! - Upgrade `@/lib/user.ts` to a Server Action.

  So that it can be used in both Server Components and Client Components.

## 0.7.1

### Patch Changes

- [#108](https://github.com/mogeko/bookworm/pull/108) [`fb28064`](https://github.com/mogeko/bookworm/commit/fb2806487bff92478b663f9b4bcca6039afbc995) Thanks [@mogeko](https://github.com/mogeko)! - Clear the search history after the user logout.

- [#108](https://github.com/mogeko/bookworm/pull/108) [`f8b0e9d`](https://github.com/mogeko/bookworm/commit/f8b0e9dcf0217aaf6ceb034d195028654818c1da) Thanks [@mogeko](https://github.com/mogeko)! - Add a date limit for valid daily recommendations (`/made4u`).

  - From: the day the user registers
  - To: Today

- [#108](https://github.com/mogeko/bookworm/pull/108) [`5b691d1`](https://github.com/mogeko/bookworm/commit/5b691d1ee564bd30e7b5efe51522d4a25728375e) Thanks [@mogeko](https://github.com/mogeko)! - Distinguish users when saving search history.

## 0.7.0

### Minor Changes

- [#106](https://github.com/mogeko/bookworm/pull/106) [`3a32458`](https://github.com/mogeko/bookworm/commit/3a32458819c7878f2b1faf2d905506b2be11ad44) Thanks [@mogeko](https://github.com/mogeko)! - Create a Server Action to provide data for the "Made for you" function.

### Patch Changes

- [#106](https://github.com/mogeko/bookworm/pull/106) [`841838f`](https://github.com/mogeko/bookworm/commit/841838f6f5b6e2783c1e70faa9292a2c847cba14) Thanks [@mogeko](https://github.com/mogeko)! - Bump version of [`Next.js`](https://www.npmjs.com/package/next) from `13.4.12` to `13.4.13`.

  Fix issue[#90](https://github.com/mogeko/bookworm/issues/90).

- [#106](https://github.com/mogeko/bookworm/pull/106) [`9efb6ae`](https://github.com/mogeko/bookworm/commit/9efb6ae87a068ca494c50a43efb6c988b043ceb9) Thanks [@mogeko](https://github.com/mogeko)! - Remove the extra `isLoading`.

  > Because `keepPreviousData` + `fallbackData` is set, `data` can never be `undefined`.

- Updated dependencies [[`f69ce84`](https://github.com/mogeko/bookworm/commit/f69ce844df385a5019e2d91bb94963bdcd9f617d)]:
  - @mogeko/bookworm-db@0.10.2

## 0.6.2

### Patch Changes

- [#99](https://github.com/mogeko/bookworm/pull/99) [`7090421`](https://github.com/mogeko/bookworm/commit/7090421c5a0e82d46793ba0d5a74946c3b71789b) Thanks [@mogeko](https://github.com/mogeko)! - Use the `history` as the initial value of `useSearch`.

## 0.6.1

### Patch Changes

- [#97](https://github.com/mogeko/bookworm/pull/97) [`f1b7c4b`](https://github.com/mogeko/bookworm/commit/f1b7c4b5aa0098db746db7178fbd0f2476a7fa9e) Thanks [@mogeko](https://github.com/mogeko)! - Handling errors, when the query fails.

## 0.6.0

### Minor Changes

- [#95](https://github.com/mogeko/bookworm/pull/95) [`2566c0e`](https://github.com/mogeko/bookworm/commit/2566c0e2b85d39a67fabd9d5e32eb6a31ebc2d17) Thanks [@mogeko](https://github.com/mogeko)! - Add history to the Search Dialog.

- [#95](https://github.com/mogeko/bookworm/pull/95) [`d99cfc8`](https://github.com/mogeko/bookworm/commit/d99cfc8872cdc13e98f6b994fff548a3c84859bf) Thanks [@mogeko](https://github.com/mogeko)! - Complete the core functions of the `Search` component.

- [#95](https://github.com/mogeko/bookworm/pull/95) [`6cab907`](https://github.com/mogeko/bookworm/commit/6cab90708ae4d083e02499350afc12ddbba61abe) Thanks [@mogeko](https://github.com/mogeko)! - Switch themes in the `Search` component.

- [#95](https://github.com/mogeko/bookworm/pull/95) [`e223f73`](https://github.com/mogeko/bookworm/commit/e223f737df4363bb65366f57fdd4a0ca0b041101) Thanks [@mogeko](https://github.com/mogeko)! - Search for the author's name and ISBN number at the same time.

### Patch Changes

- [#95](https://github.com/mogeko/bookworm/pull/95) [`e223f73`](https://github.com/mogeko/bookworm/commit/e223f737df4363bb65366f57fdd4a0ca0b041101) Thanks [@mogeko](https://github.com/mogeko)! - Limit the number of results per search request to 10.

- [#95](https://github.com/mogeko/bookworm/pull/95) [`4963daf`](https://github.com/mogeko/bookworm/commit/4963dafd8b06649d7448ace0194c2f526957c7ba) Thanks [@mogeko](https://github.com/mogeko)! - Add shortcut keys to the cleanHistoty command.

- [#95](https://github.com/mogeko/bookworm/pull/95) [`8a50897`](https://github.com/mogeko/bookworm/commit/8a50897da7f82cb517f124df18cb00f2da9860b6) Thanks [@mogeko](https://github.com/mogeko)! - Set the parameter `delay` as required for `useDebounce` (use `null` to skip delay).

## 0.5.0

### Minor Changes

- [#93](https://github.com/mogeko/bookworm/pull/93) [`398455b`](https://github.com/mogeko/bookworm/commit/398455bce2ae82392613430bd2029946ec4fbd2b) Thanks [@mogeko](https://github.com/mogeko)! - Complete the general skeleton for the `/dashboard/:uid/booklists` page.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`9b4b603`](https://github.com/mogeko/bookworm/commit/9b4b603b4b30553f212b77363d4d777cafe90e39) Thanks [@mogeko](https://github.com/mogeko)! - Complete the `/dashboard/:uid/booklists` page.

### Patch Changes

- [#93](https://github.com/mogeko/bookworm/pull/93) [`df3ded2`](https://github.com/mogeko/bookworm/commit/df3ded2e843e0aef9adf7b8a7061a96263a3212a) Thanks [@mogeko](https://github.com/mogeko)! - Complete the `/dashboard/browse` page.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`bc1ed85`](https://github.com/mogeko/bookworm/commit/bc1ed85962a56f5b682ad926f129c5b47a5840d5) Thanks [@mogeko](https://github.com/mogeko)! - Create `columns.tsx` to describe how to display data in the table.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`d8bb81b`](https://github.com/mogeko/bookworm/commit/d8bb81b7c37f0d41563b7500ed3b45b591a44646) Thanks [@mogeko](https://github.com/mogeko)! - Add an action menu to the table.

  TODO: Implement specific functions with Server Actions.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`9b4b603`](https://github.com/mogeko/bookworm/commit/9b4b603b4b30553f212b77363d4d777cafe90e39) Thanks [@mogeko](https://github.com/mogeko)! - Add pagination to the table.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`11e0995`](https://github.com/mogeko/bookworm/commit/11e09951f7ea880146db7f9f97d8187518ebcc3a) Thanks [@mogeko](https://github.com/mogeko)! - Add faceted filter to the table.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`c325450`](https://github.com/mogeko/bookworm/commit/c325450ed511b8df93ab52ba23edeb501c589ca7) Thanks [@mogeko](https://github.com/mogeko)! - Add a search bar for the table.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`4f8b3ac`](https://github.com/mogeko/bookworm/commit/4f8b3ace9ae4d090625f2aaef83e41bb08d5df85) Thanks [@mogeko](https://github.com/mogeko)! - Make `columns.title` cannot be hidden.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`c357ce6`](https://github.com/mogeko/bookworm/commit/c357ce6294db8174648ff7427bac673f30ca756c) Thanks [@mogeko](https://github.com/mogeko)! - Add view options to the table.

- [#93](https://github.com/mogeko/bookworm/pull/93) [`4fc55ad`](https://github.com/mogeko/bookworm/commit/4fc55add85a1caf77727618501cd82fb63657591) Thanks [@mogeko](https://github.com/mogeko)! - Create links to the `/booklist/:booklistId` page.

- Updated dependencies [[`965469e`](https://github.com/mogeko/bookworm/commit/965469ea4b03075ccec3cfaa9c87c47d14bdcd2f)]:
  - @mogeko/bookworm-db@0.10.1

## 0.4.1

### Patch Changes

- [#91](https://github.com/mogeko/bookworm/pull/91) [`7c51d55`](https://github.com/mogeko/bookworm/commit/7c51d55eb71081abb4b79b17376321b94e630a99) Thanks [@mogeko](https://github.com/mogeko)! - Encapsulate `ScrollArea` with `BookArtwork` to improve the reusability.

## 0.4.0

### Minor Changes

- [#88](https://github.com/mogeko/bookworm/pull/88) [`0e0a7a8`](https://github.com/mogeko/bookworm/commit/0e0a7a89aa366f7e094f314f1e787664fdd11830) Thanks [@mogeko](https://github.com/mogeko)! - Complete the relevant logic of registering an account.

### Patch Changes

- [#88](https://github.com/mogeko/bookworm/pull/88) [`4e8ec9c`](https://github.com/mogeko/bookworm/commit/4e8ec9cab0633eaf97e7fcd9721cf9bc707b901d) Thanks [@mogeko](https://github.com/mogeko)! - Logout by server action.

## 0.3.2

### Patch Changes

- [#86](https://github.com/mogeko/bookworm/pull/86) [`075e12b`](https://github.com/mogeko/bookworm/commit/075e12b5b91199db6e64c87ef43aaa92ebbdce62) Thanks [@mogeko](https://github.com/mogeko)! - Show Book lists in the sidebar.

- Updated dependencies [[`06df6cf`](https://github.com/mogeko/bookworm/commit/06df6cfcf19377c24b8d76277922e2ccb58cce1a), [`2ce0214`](https://github.com/mogeko/bookworm/commit/2ce021441348ddea3a91206aba029dec56e514cb)]:
  - @mogeko/bookworm-db@0.10.0

## 0.3.1

### Patch Changes

- [#84](https://github.com/mogeko/bookworm/pull/84) [`5c65480`](https://github.com/mogeko/bookworm/commit/5c6548021c6e7869854cb920d941d5b0b96bc940) Thanks [@mogeko](https://github.com/mogeko)! - Verify and Login with [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) instead of [REST API](https://github.com/mogeko/bookworm/blob/eb675825116860414e6a2e2b9e8bb4716cb9a5ff/apps/web/app/auth/route.ts#L7).

## 0.3.0

### Minor Changes

- [#82](https://github.com/mogeko/bookworm/pull/82) [`86c1ee4`](https://github.com/mogeko/bookworm/commit/86c1ee43fad32582924948bbfec2ad10e98916c7) Thanks [@mogeko](https://github.com/mogeko)! - Complete the main body of the user menu.

### Patch Changes

- [#82](https://github.com/mogeko/bookworm/pull/82) [`66cc698`](https://github.com/mogeko/bookworm/commit/66cc698025fa9be6d6feaf493cde7becdc9d7993) Thanks [@mogeko](https://github.com/mogeko)! - Trigger Logout with shortcut keys (`⌃⇧⌘Q`).

- [#82](https://github.com/mogeko/bookworm/pull/82) [`8981182`](https://github.com/mogeko/bookworm/commit/898118223e431059878d4b66e0880bd8e11c23c8) Thanks [@mogeko](https://github.com/mogeko)! - Hide the search bar/button on the `/login` page.

- [#82](https://github.com/mogeko/bookworm/pull/82) [`56fddb9`](https://github.com/mogeko/bookworm/commit/56fddb9625aa45c8da016077325d911c3f7c5b18) Thanks [@mogeko](https://github.com/mogeko)! - Redirect to `/dashboard/:uid` if the URL is `/dashboard`.

- Updated dependencies [[`8674cac`](https://github.com/mogeko/bookworm/commit/8674caca3f5fb4ee9ddf25bf8ae59a8d2339d8a2)]:
  - @mogeko/bookworm-db@0.9.3

## 0.2.0

### Minor Changes

- [#79](https://github.com/mogeko/bookworm/pull/79) [`4ca36a5`](https://github.com/mogeko/bookworm/commit/4ca36a5f15c54fd2bd23b7e522d4fff21a24246f) Thanks [@mogeko](https://github.com/mogeko)! - Complete the Sign in / Sign up page to the UI section.

- [#79](https://github.com/mogeko/bookworm/pull/79) [`2cec94b`](https://github.com/mogeko/bookworm/commit/2cec94bd35d34972370e42b9688a5617e65d4c2b) Thanks [@mogeko](https://github.com/mogeko)! - Verify the login token.

- [#79](https://github.com/mogeko/bookworm/pull/79) [`c5b13a3`](https://github.com/mogeko/bookworm/commit/c5b13a38682fe23cbbce91238f9004a4ab591dbc) Thanks [@mogeko](https://github.com/mogeko)! - Create an api to generate a login token (`jwt`).

### Patch Changes

- [#79](https://github.com/mogeko/bookworm/pull/79) [`8a4d84e`](https://github.com/mogeko/bookworm/commit/8a4d84e61ce1d83937b6b59a2e06906968d0b82b) Thanks [@mogeko](https://github.com/mogeko)! - Redirect `/` to `/dashboard`.

- [#79](https://github.com/mogeko/bookworm/pull/79) [`f083d41`](https://github.com/mogeko/bookworm/commit/f083d41ee3130e489fca952e6a7bc55b60b79e6f) Thanks [@mogeko](https://github.com/mogeko)! - Automatically jump to the source URL, after logging in.

- Updated dependencies [[`17f2162`](https://github.com/mogeko/bookworm/commit/17f2162de75091a0a0414cdba7220bc5a9a4a429)]:
  - @mogeko/bookworm-db@0.9.2

## 0.1.0

### Minor Changes

- [#73](https://github.com/mogeko/bookworm/pull/73) [`71858f1`](https://github.com/mogeko/bookworm/commit/71858f12ed889e07a075812aaee601e96ffd2075) Thanks [@mogeko](https://github.com/mogeko)! - Complete the popular recommendation part of the homepage.

- [#73](https://github.com/mogeko/bookworm/pull/73) [`23b52fb`](https://github.com/mogeko/bookworm/commit/23b52fb8c793b372be396d40ae1af2e1eb7e9078) Thanks [@mogeko](https://github.com/mogeko)! - Complete the `Made for You` part of the homepage.

### Patch Changes

- Updated dependencies [[`6e82f4a`](https://github.com/mogeko/bookworm/commit/6e82f4a5da7cb086e5e06077b9c82f401981b391), [`f9bfca5`](https://github.com/mogeko/bookworm/commit/f9bfca521e63a815ee3a2786234908ac8e59bdbb)]:
  - @mogeko/bookworm-db@0.9.1

## 0.0.11

### Patch Changes

- Updated dependencies [[`7709b41`](https://github.com/mogeko/bookworm/commit/7709b4173bb33e7f93a59cf2a535ce821c9a6861), [`e9b8258`](https://github.com/mogeko/bookworm/commit/e9b82586b1e85927abda4cfa42d5cd9be7aee20f), [`7709b41`](https://github.com/mogeko/bookworm/commit/7709b4173bb33e7f93a59cf2a535ce821c9a6861)]:
  - @mogeko/bookworm-db@0.9.0

## 0.0.10

### Patch Changes

- Updated dependencies [[`4ee1cdc`](https://github.com/mogeko/bookworm/commit/4ee1cdc559e610229afd9b25ec1e7ba4eaf5c57d), [`bbac5fe`](https://github.com/mogeko/bookworm/commit/bbac5fe62dec48a7074f0e100ad98131bbafcab3)]:
  - @mogeko/bookworm-db@0.8.0

## 0.0.9

### Patch Changes

- Updated dependencies [[`5a68819`](https://github.com/mogeko/bookworm/commit/5a68819c576c157588166207eb1cf97a051f1944)]:
  - @mogeko/bookworm-db@0.7.0

## 0.0.8

### Patch Changes

- Updated dependencies [[`3404b6c`](https://github.com/mogeko/bookworm/commit/3404b6c4919887340c7a2659fc8ca7431978653c), [`ed47d1e`](https://github.com/mogeko/bookworm/commit/ed47d1e680131efe52659acbf57a541237588399), [`1d75631`](https://github.com/mogeko/bookworm/commit/1d756310ba7b1178ab13b07fbf5047569c825c3a)]:
  - @mogeko/bookworm-db@0.6.0

## 0.0.7

### Patch Changes

- Updated dependencies [[`31a22f7`](https://github.com/mogeko/bookworm/commit/31a22f79525a4c88cce93bee31c276d6964bab78)]:
  - @mogeko/bookworm-db@0.5.0

## 0.0.6

### Patch Changes

- Updated dependencies [[`e5f56f5`](https://github.com/mogeko/bookworm/commit/e5f56f56f98c555c72e81e6c9450162d4eb01172)]:
  - @mogeko/bookworm-db@0.4.0

## 0.0.5

### Patch Changes

- Updated dependencies [[`771ee76`](https://github.com/mogeko/bookworm/commit/771ee76900bd2d7494fd465ea9f86a908335e91d), [`c287936`](https://github.com/mogeko/bookworm/commit/c287936626402c958bc2aefef43196992e828884)]:
  - @mogeko/bookworm-db@0.3.0

## 0.0.4

### Patch Changes

- Updated dependencies [[`4967474`](https://github.com/mogeko/bookworm/commit/49674740bd20673a3bcef2b106b42b121aeded82), [`a5eb43a`](https://github.com/mogeko/bookworm/commit/a5eb43a5c23cecdb0a304b838a32b144b43e5535)]:
  - @mogeko/bookworm-db@0.2.0

## 0.0.3

### Patch Changes

- Updated dependencies [[`fc4f030`](https://github.com/mogeko/bookworm/commit/fc4f030eb1fd550cfb38ee41e7c69e5032cf59b7)]:
  - @mogeko/bookworm-db@0.1.0

## 0.0.2

### Patch Changes

- Updated dependencies [[`5adcdcd`](https://github.com/mogeko/bookworm/commit/5adcdcda2481cf155e349c7c29d781da7f1dc179)]:
  - @mogeko/bookworm-db@0.0.2

## 0.0.1

### Patch Changes

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Setup monorepo

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Bump the version of [Next.js](https://nextjs.org) to `13.4.10`.

  - Setup [App Router](https://nextjs.org/docs/getting-started/installation)

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Completely abandon the [old project](https://github.com/mogeko/book-exchange/tree/archive-b400c7) and restart a new one.

- [#44](https://github.com/mogeko/bookworm/pull/44) [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2) Thanks [@mogeko](https://github.com/mogeko)! - Setup [shadcn/ui](https://ui.shadcn.com).

  - Remove [daisyUI](https://daisyui.com).

- Updated dependencies [[`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2), [`04c751d`](https://github.com/mogeko/bookworm/commit/04c751dbb5ab27a23b98d9b65da9995093a729d2)]:
  - @mogeko/bookworm-db@0.0.1
