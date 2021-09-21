import { nullish } from "../helpers/nullish.js";
import { curry } from "../lambda/curry.js";

export const getWithDefault = curry((key, defaultValue, dict) =>
  nullish(dict[key]) ? defaultValue : dict[key]
);
