import { isNil } from "./nil";

// Iterable functions used for iterable collection types
// Only guaranteed to work with iterable collections from this library

// stolen from https://stackoverflow.com/a/32538867
export const isIterable = (obj) =>
  !isNil(obj) && typeof obj[Symbol.iterator] === "function";
