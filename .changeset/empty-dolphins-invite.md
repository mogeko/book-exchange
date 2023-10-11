---
"@mogeko/bookworm-web": patch
---

Optimize the creation time of comments in Book Details page.

Dynamically display the date (by [`format`](https://date-fns.org/v2.30.0/docs/format)) or distance from today (by [`formatDistanceToNow`](https://date-fns.org/v2.30.0/docs/formatDistanceToNow)) based on the comment time.
