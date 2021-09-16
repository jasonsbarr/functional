import { nullish } from "../helpers/nullish.js";
import { curry } from "../lambda/curry.js";

export const getWithDefault = curry((key, defaultValue, hash) =>
  nullish(hash[key]) ? defaultValue : hash[key]
);
