import { curry } from "../lambda/curry.js";

export const unshift = curry((item, arr) => {
  let result = [...arr];
  result.unshift(item);
  return result;
});
