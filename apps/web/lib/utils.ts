import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tap<T>(fn: (x: T) => void) {
  return (x: T) => (fn(x), x);
}

export function range(to: number): number[];
export function range(from: number, to: number): number[];
export function range(from: number, to?: number) {
  return Array.from({ length: to ? to - from : from }, (_, i) => i + from);
}
