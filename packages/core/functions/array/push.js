import { curry } from "../lambda/curry.js";

export const push = curry((item, arr) => {
  let result = [...arr];
  result.push(item);
  return result;
});
