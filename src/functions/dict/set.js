import { curry } from "../lambda/curry.js";

export const set = curry((key, value, hash) => {
  let copy = Object.assign(Object.create(null), hash);
  copy[key] = value;
  return copy;
});
