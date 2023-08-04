"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number | null): T {
  const [debounced, setDebounced] = useState(value);

  // Set timeout to update debounced value.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) return;

    const timeout = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
