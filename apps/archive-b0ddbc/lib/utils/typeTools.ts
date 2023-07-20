type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// XOR<{foo: string;}, {bar: number}>
// { foo: "test" } // OK
// { bar: 1 } // OK
// { foo: "test",  bar: 1 } // Error
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

// Head<['a', 'b', 'c']> // 'a'
export type Head<T extends any[]> = T extends [infer H, ...infer _] ? H : never;

// Tail<['a', 'b', 'c']> // ['b', 'c']
export type Tail<T extends any[]> = T extends [infer _, ...infer R] ? R : never;

// First<['a', 'b', 'c']> // 'a'
export type First<T extends any[]> = Head<T>;

// Last<['a', 'b', 'c']> // 'c'
export type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

// Concat<['a', 'b'], ['c', 'd']> // ['a', 'b', 'c', 'd']
export type Concat<T extends any[], U extends any[]> = [...T, ...U];

// TupleToUnion<['a', 'b']> // 'a' | 'b'
export type TupleToUnion<T extends any[]> = T[number];

// AppendArgument<(a: number, b: string) => number, boolean> // (a: number, b: string, c: boolean) => number
export type AppendArgument<Fn extends (...s: any[]) => any, A> = Fn extends (
  ...s: infer T
) => infer R
  ? (...s: [...T, A]) => R
  : never;

// Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
export type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...(First extends any[] ? Flatten<First> : [First]), ...Flatten<Rest>]
  : T;
