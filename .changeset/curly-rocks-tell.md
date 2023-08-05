---
"@mogeko/bookworm-web": patch
---

Remove the extra `isLoading`.

> Because `keepPreviousData` + `fallbackData` is set, `data` can never be `undefined`.
